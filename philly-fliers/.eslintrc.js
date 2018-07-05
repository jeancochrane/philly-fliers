// https://eslint.org/docs/user-guide/configuring
// Adapted from the Civic Apps App Template, with modifications for Vue.js.

const path = require('path')

module.exports = {
    extends: "airbnb",
    env: {
        "es6": true,
        "browser": true,
        "node": true,
        "mocha": true,
    },
    parser: "babel-eslint",
    plugins: [
        "vue",
    ],
    rules: {
        "indent": [2, 4, { "SwitchCase": 1, "VariableDeclarator": 2 }],
        "max-statements": [0, 10],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    settings: {
        "import/resolver": {
            webpack: {
                config: path.resolve(__dirname, "build/webpack.base.conf.js",
            }
        }
    }
}
