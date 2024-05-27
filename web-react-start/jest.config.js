module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)'
    ],
    globals: {
      'babel-jest': {
        useESM: true,
      },
    },
  };
  