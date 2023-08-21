module.exports = {
  globDirectory: "build/chrome-mv3-dev/",
  globPatterns: ["**/*.{js,png,json,html,css}"],
  swDest: "build/chrome-mv3-dev/sw.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/]
}
