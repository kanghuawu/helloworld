import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${ touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });

  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Activity Type"
          name="activity_type"
          component={this.renderField}
        />
        <div>
          <label>Hours</label>
          <div>
            <Field
              name="hours"
              component="select"
            >
              <option />
              <option value="1" default>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Field>
          </div>
        </div>
        <Field
          label="Message"
          name="message"
          component={this.renderField}
        />

        <button type="submit" className="btn btn-primary" >Submit</button>
        <Link className="btn btn-danger" to="/">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> {title: 'asdf', categories: 'asdf', 'content': 'asdf'}
  const errors = {};

  // Validate the input from 'values'
  if(!values.activity_type){
    errors.activity_type = "Enter an activity type!";
  }
  if(!values.hours){
    errors.hours = "Enter an hour";
  }
  if(!values.message){
    errors.message = "Enter some message!";
  }
  // If errors is empty, the form is fine to submit.
  // If erros has *any* properties, redux form assumes is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
