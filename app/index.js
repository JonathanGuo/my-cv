import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import fontawesome from '@fortawesome/fontawesome';
import fontawesomeFreeSolid from '@fortawesome/fontawesome-free-solid';
import fontawesomeFreeBrands from '@fortawesome/fontawesome-free-brands';
import Root from './config/Root';

fontawesome.library.add(fontawesomeFreeSolid, fontawesomeFreeBrands);

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
