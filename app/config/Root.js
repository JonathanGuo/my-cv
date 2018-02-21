import React from 'react';
import { Route } from 'react-router-dom';
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
                        <Route path="/" component={App} />
                    </main>
                </div>
            </ConnectedRouter>
        </Provider>
    );
};

export default Root;
