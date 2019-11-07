'use strict';

module.exports = function (api) {

  api.cache(true);
  const presets = [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }],
    '@babel/react'
  ];
  const plugins = [
    'add-module-exports',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import'
  ];
  return {
    presets,
    plugins
  };
};
