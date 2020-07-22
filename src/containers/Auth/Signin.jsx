import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import SigninComponent from '../../components/Auth/Signin';

import {
	signin,
	makeSelectError,
	makeSelectLoading,
	makeSelectUser
} from '../../ducks/auth/signin';

class SigninContainer extends Component {

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(data) {
		this.props.signin(data);
	}

	render() {
		return (
			<SigninComponent
				onSubmit={this.onSubmit}
			/>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	user: makeSelectUser(),
	isLoading: makeSelectLoading(),
	error: makeSelectError()
});

const mapDispatchToProps = {
	signin
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default withConnect(SigninContainer);