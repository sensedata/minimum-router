module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "overrides": [
    {
      "files": [".eslintrc.{js,cjs}"],
      "env": {"node": true},
      "parserOptions": {
        "sourceType": "script"
      }
    },
    {
      "files": ["src/**"],
      "plugins": ["react"],
      "extends": ["plugin:react/recommended"],
      "rules": {
        "react/prop-types": "off"
      }
    },
    {
      "files": ["test/**"],
      "plugins": ["jest"],
      "extends": ["plugin:jest/recommended"],
      "rules": {
        "jest/prefer-expect-assertions": "off"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": ["warn", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["warn", "double"],
    "semi": ["error", "always"],
  }
};
