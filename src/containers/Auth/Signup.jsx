import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import SignupComponent from '../../components/Auth/Signup';

import {
	signin,
	makeSelectError,
	makeSelectLoading,
	makeSelectUser
} from '../../ducks/signin';

class SignupContainer extends Component {

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(data) {
		this.props.signin(data);
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
	error: makeSelectError()
});

const mapDispatchToProps = {
	signin
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default withConnect(SignupContainer);