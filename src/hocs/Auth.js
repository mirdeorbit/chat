import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
    checkAuth,
    makeSelectAuth,
    makeAuthLoading,
    makeAuthError
} from '../ducks/auth';

function Auth(WrappedComponent) {
    class AuthContainer extends Component {
        componentDidMount() {
            this.props.checkAuth();
        }

        render() {
            return (
                <WrappedComponent/>
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