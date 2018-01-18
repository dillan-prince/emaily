const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  subject: String,
  recipients: [RecipientSchema],
  title: String,
  body: String,
  yesResponses: { type: Number, default: 0 },
  noResponses: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponse: Date
});

mongoose.model("surveys", surveySchema);
