import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname
})
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      "react/display-name": "off",
      "react/jsx-uses-react": "warn",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "warn",
      "react/jsx-closing-bracket-location": "warn",
      "react/jsx-closing-tag-location": "warn",
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-tag-spacing": ["warn"],
      "react/jsx-no-undef": ["warn", { allowGlobals: true }],
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "warn",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],
      "react/prop-types": "off",
      "no-mixed-spaces-and-tabs": "warn",
      "no-case-declarations": "off",
      "linebreak-style": "off",
      "dot-notation": "off"
    }
  }
]
export default eslintConfig
