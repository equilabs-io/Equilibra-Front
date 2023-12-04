/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;
// module.exports = {
//   semi: true,
//   trailingComma: "all",
//   singleQuote: true,
//   printWidth: 80,
//   tabWidth: 2,
//   plugins: [
//     "@ianvs/prettier-plugin-sort-imports",
//     "prettier-plugin-tailwindcss",
//   ],
//   importOrder: [
//     "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
//     "^(next/(.*)$)|^(next$)",
//     "^(expo(.*)$)|^(expo$)",
//     "<THIRD_PARTY_MODULES>",
//     "",
//     "^@blobscan/(.*)$",
//     "",
//     "^~/utils/(.*)$",
//     "^~/components/(.*)$",
//     "^~/styles/(.*)$",
//     "^~/(.*)$",
//     "^[./]",
//   ],
// };
