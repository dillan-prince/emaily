// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
  const invalidEmails = emails
    .split(",")
    .map(email => email.trim())
    .filter(email => !EMAIL_REGEX.test(email));

  return invalidEmails.length === 0
    ? null
    : invalidEmails.length === 1
      ? `${invalidEmails} is an invalid email.`
      : `Invalid emails: ${invalidEmails.join(", ")}`;
};
