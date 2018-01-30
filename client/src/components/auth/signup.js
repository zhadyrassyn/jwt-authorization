import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'
import { connect } from 'react-redux'

class Signup extends Component {
    handleFormSubmit(values) {
        this.props.signupUser(values)
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    renderField(field) {
        const { meta : {touched, error }} = field
        return (
            <div>
                <label>{field.label}</label>
                <input className="form-control" type={field.type} {...field.input}/>
                {touched && error && <div className="error">{error}</div>}
            </div>
        )
    }

    render() {
        const { handleSubmit, fields:{ email, password, passwordConfirm}} = this.props

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <Field label="Email:" type="text" name="email" component={this.renderField}/>
                </fieldset>
                <fieldset className="form-group">
                    <Field label="Password:" type="password" name="password" component={this.renderField}/>
                </fieldset>
                <fieldset className="form-group">
                    <Field label="Confirm password:" type="password" name="passwordConfirm" component={this.renderField}/>
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error}
}

function validate(formProps) {
    const errors = {}

    if(!formProps.email) {
        errors.email = 'Please enter an email'
    }

    if(!formProps.password) {
        errors.password = 'Please enter a password'
    }

    if(!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation'
    }

    if(formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match'
    }

    return errors
}

Signup = reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(Signup)

Signup = connect(mapStateToProps, actions)(Signup)

export default Signup