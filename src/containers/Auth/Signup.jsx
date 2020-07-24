import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SignupComponent from '../../components/Auth/Signup';

import { setAuth } from '../../ducks/auth/check';

import {
	signup,
	makeSelectError,
	makeSelectLoading,
	makeSelectUser
} from '../../ducks/auth/signup';

import { makeSelectAuth } from '../../ducks/auth/check';

class SignupContainer extends Component {

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.user && this.props.user) {
			localStorage.setItem('currentUserToken', this.props.user.token);
			this.props.setAuth({
				user: this.props.user
			});
		}

		if (this.props.auth) {
			this.props.history.push('/');
		}
	}

	onSubmit(data) {
		this.props.signup(data);
	}

	render() {
		return (
			<SignupComponent
				onSubmit={this.onSubmit}
			/>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	user: makeSelectUser(),
	isLoading: makeSelectLoading(),
	error: makeSelectError(),
	auth: makeSelectAuth()
});

const mapDispatchToProps = {
	signup,
	setAuth
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default withRouter(withConnect(SignupContainer));