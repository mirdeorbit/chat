import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import {
	checkAuth,
	makeSelectAuth,
	makeAuthLoading,
	makeAuthError
} from '../ducks/auth';

function Auth(WrappedComponent) {
	class AuthContainer extends Component {
		static propTypes = {
			checkAuth: PropTypes.func.isRequired,
			auth: PropTypes.object
		};

		static defaultProps = {
			auth: null
		};

		componentDidMount() {
			this.props.checkAuth();
		}

		render() {
			const { auth } = this.props;

			return auth ? (
				<WrappedComponent/>
			) : (
				<h1>Not authorized</h1>
			)
		}
	}

	const mapStateToProps = createStructuredSelector({
		auth: makeSelectAuth(),
		isLoading: makeAuthLoading(),
		error: makeAuthError()
	});

	const mapDispatchToProps = {
		checkAuth
	};

	const withConnect = connect(
		mapStateToProps,
		mapDispatchToProps
	);

	return withConnect(AuthContainer);
}

export default Auth;