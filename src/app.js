import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from './containers/App';
import NotFound from './components/NotFound';

import store, { history } from './store';

const MOUNT_NODE = document.getElementById('root');

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path='/' component={App} />
                    <Route component={NotFound} />
                </Switch>
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