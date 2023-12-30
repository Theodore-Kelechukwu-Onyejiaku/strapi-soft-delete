module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    // "extends": [
    //     "eslint:recommended",
    //     "plugin:@typescript-eslint/recommended",
    //     "plugin:react/recommended"
    // ],
    "extends": [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "root": true,
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        'no-shadow': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/media-has-caption': 'off',
        'react/prop-types': 'off',
        'array-callback-return': 'off',
        'consistent-return': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'no-param-reassign': 'off',
        camelcase: 'off',
        'max-len': 'off',
        'no-useless-return': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-no-constructed-context-values': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'no-alert': 'off',
        radix: 'off',
        'no-plusplus': 'off',
        'react/no-unescaped-entities': 'off',
        'no-nested-ternary': 'off',
        'import/no-extraneous-dependencies': 'off',
        'jsx-a11y/no-autofocus': 'off',
        'no-underscore-dangle': 'off',
        'no-return-assign': 'off',
    }
}
