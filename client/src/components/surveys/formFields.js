export default [
  {
    name: "subject",
    label: "Subject Line",
    errors: { required: "You must provide a subject!" }
  },
  {
    name: "recipients",
    label: "Recipient List",
    errors: { required: "You must provide a list of recipients!" }
  },
  {
    name: "title",
    label: "Survey Title",
    errors: { required: "You must provide a survey title!" }
  },
  {
    name: "body",
    label: "Email Body",
    errors: { required: "You must provide an email body!" }
  }
];
