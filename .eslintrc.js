module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jasmine": true
    },
    "extends": "eslint:recommended",
    "rules": {
        // for each rule, read more at http://eslint.org/docs/rules/RULE
        // e.g. http://eslint.org/docs/rules/indent

        "eqeqeq": ["error", "always"],
        "indent": [
            "error",
            4,
            { SwitchCase: 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unexpected-multiline": "error",
        "no-unused-vars": [
            "error",
            { "args": "none" }
        ],
        "no-console": "error", // since we use our logger library, disallow console logging
        "brace-style": [
            "error",
            "1tbs",
            { "allowSingleLine": true }
        ],
        "key-spacing": [
            "error",
            {
                "beforeColon": false,
                "afterColon": true
            }
        ]
    }
};
