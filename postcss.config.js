
const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-cssnext'),
        require('precss'),
        require('postcss-each'),
        tailwindcss('./tailwind-config.js'),
    ],
};
