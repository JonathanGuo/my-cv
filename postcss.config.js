
const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-cssnext'),
        require('precss'),
        tailwindcss('./tailwind-config.js'),
    ],
};
