const { resolve } = require('path');

const dotenvResult = require('dotenv').config({
    path: resolve(__dirname, '../../.api.env'),
});

module.exports = {
    ...dotenvResult.parsed,
};
