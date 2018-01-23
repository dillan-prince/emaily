import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../actions';

class SurveyFormReview extends Component {
  render() {
    return (
      <div>
        {this.renderFields()}
        <Link to="/surveys/new" className="red btn left white-text" onClick={this.props.onCancel}>
          <i className="material-icons left">navigate_before</i>
          Back
        </Link>
        <button
          type="submit"
          className="green btn right white-text"
          onClick={() => this.props.submitSurvey(this.props.formValues, this.props.history)}
        >
          Confirm
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }

  renderFields() {
    return formFields.map(({ name, label }, index) => {
      return (
        <div key={index}>
          <label htmlFor={name}>{label}</label>
          <p name={name}>{this.props.formValues[name]}</p>
        </div>
      );
    });
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
