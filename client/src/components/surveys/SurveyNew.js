import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  state = { showFormReview: false };

  render() {
    return this.state.showFormReview ? (
      <div>
        <h4>Survey Form - Confirmation</h4>
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      </div>
    ) : (
      <div>
        <h4>Survey Form</h4>
        <SurveyForm
          onSurveySubmit={() => this.setState({ showFormReview: true })}
        />
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
