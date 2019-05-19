const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },	
  transformIgnorePatterns: [	
    "node_modules/(?!(@?react-native.*|@?react-navigation.*|react)/)"
  ],	
}
