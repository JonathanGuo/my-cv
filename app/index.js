import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import fontawesome from '@fortawesome/fontawesome';
import { faExternalLinkAlt, faBriefcase, faWrench } from '@fortawesome/fontawesome-free-solid';
import Root from './config/Root';

fontawesome.library.add(faExternalLinkAlt, faBriefcase, faWrench);

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(Root);

if (module.hot) {
    module.hot.accept('./config/Root', () => {
        const newApp = require('./config/Root').default;
        render(newApp);
    });
}
