const { resolve } = require('path');

const envPath = process.env.NODE_ENV === 'production'
    ? '../api.env'
    : '../../.api.env';

const dotenvResult = require('dotenv').config({
    path: resolve(__dirname, envPath),
});

module.exports = {
    ...dotenvResult.parsed,
};
