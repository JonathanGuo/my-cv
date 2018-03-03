import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './Store';
import App from '../containers/App';
import Nav from '../components/Nav';

const pageWrapId = 'page-wrap';
const outerContainerId = 'outer-container';

const Root = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div id={outerContainerId}>
                    <Nav
                        pageWrapId={pageWrapId}
                        outerContainerId={outerContainerId}
                    />
                    <main id={pageWrapId}>
                        <Switch>
                            <Route exact path="/" component={App} />
                            <Route path="/:section" component={App} />
                        </Switch>
                    </main>
                </div>
            </ConnectedRouter>
        </Provider>
    );
};

export default hot(module)(Root);
