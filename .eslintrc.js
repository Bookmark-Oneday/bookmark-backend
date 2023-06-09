module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": 2020,
    },
    "rules": {
        "max-len": [
            "error",
            200,
            2,
            {
                "ignoreComments": true,
                "ignoreUrls": true,
                "ignoreTemplateLiterals": true,
                "ignoreRegExpLiterals": true
            }
        ],
        "max-classes-per-file": "off",
        "default-param-last": "warn",
        "no-unused-vars": 0
    },
}
