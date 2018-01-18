import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import SurveyField from "./SurveyField";
import validateEmails from "../../utilities/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderFields()}
        <div style={{ marginTop: "20px" }}>
          <Link to="/surveys" className="red btn left white-text">
            <i className="material-icons left">navigate_before</i>
            Back
          </Link>
          <button type="submit" className="teal btn right white-text">
            Continue
            <i className="material-icons right">navigate_next</i>
          </button>
        </div>
      </form>
    );
  }

  renderFields() {
    return formFields.map(({ name, label }, index) => {
      return (
        <Field
          key={index}
          name={name}
          label={label}
          type="text"
          component={SurveyField}
        />
      );
    });
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  formFields.forEach(field => {
    if (!values[field.name]) {
      errors[field.name] = field.errors.required;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
