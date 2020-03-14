import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './containers/App';
import Auth from './components/Auth';
import NotFound from './components/NotFound';

import Layout from './containers/Layout';

import store, { history } from './store';

const MOUNT_NODE = document.getElementById('root');

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Layout>
					<Switch>
						<Route path='/auth' component={Auth} />
						<Route path='/' component={App} />
						<Route component={NotFound} />
					</Switch>
				</Layout>
			</ConnectedRouter>
		</Provider>,
		MOUNT_NODE
	);
};


module.hot.accept(['./containers/App'], () => {
	ReactDOM.unmountComponentAtNode(MOUNT_NODE);
	render();
});

render();