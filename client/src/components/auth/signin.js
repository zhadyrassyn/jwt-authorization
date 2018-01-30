import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'
import { connect } from 'react-redux'

class Signin extends Component {

    handleFormSubmit({ email, password }) {
        // Need to do something to log user in
        this.props.signinUser({ email, password });
    }

    renderField(field) {
        return (
            <input className="form-control" type={field.type} name={field.name} {...field.input} />
        )
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

    render() {
        const { handleSubmit, fields: { email, password }} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field
                        name="email"
                        component={this.renderField}
                        type="text"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field
                        name="password"
                        component={this.renderField}
                        type="password"
                    />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error}
}

Signin = reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(Signin)

Signin = connect(mapStateToProps, actions)(Signin)

export default Signin