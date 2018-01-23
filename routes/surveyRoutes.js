const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/:id/:response', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { subject, recipients, title, body } = req.body;

    const newSurvey = new Survey({
      subject,
      recipients: recipients.split(',').map((email) => ({
        email: email.trim()
      })),
      title,
      body,
      _user: req.user,
      dateSent: Date.now()
    });

    const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));

    try {
      await mailer.send();
      await newSurvey.save();

      req.user.credits--;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map((event) => {
        const match = p.test(new URL(event.url).pathname);
        console.log(match);

        if (match) {
          console.log(match);

          return {
            email: event.email,
            ...match
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each((event) => {
        console.log(event);

        Survey.updateOne(
          {
            _id: event.surveyId,
            recipients: {
              $elemMatch: { email: event.email, hasResponded: false }
            }
          },
          {
            $inc: { [`${event.choice}Responses`]: 1 },
            $set: { 'recipients.$.hasResponded': true }
          }
        ).exec();
      });

    res.send({});
  });
};
