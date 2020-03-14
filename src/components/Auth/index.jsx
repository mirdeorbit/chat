import React, { Component } from 'react';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router-dom';
import Signin from '../../containers/Auth/Signin';
import Signup from '../../containers/Auth/Signup';

import NotFound from '../../components/NotFound';

const AuthContainer = () => {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}/signin`} component={Signin} />
			<Route exact path={`${path}/signup`} component={Signup} />
			<Route component={NotFound} />
		</Switch>
	)
}

export default withRouter(AuthContainer);