import React from 'react';
import ReactDOM from 'react-dom';
import fontawesome from '@fortawesome/fontawesome';
import fontawesomeFreeSolid from '@fortawesome/fontawesome-free-solid';
import fontawesomeFreeBrands from '@fortawesome/fontawesome-free-brands';
import Root from './config/Root';

fontawesome.library.add(fontawesomeFreeSolid, fontawesomeFreeBrands);

ReactDOM.render(<Root />, document.getElementById('root'));
