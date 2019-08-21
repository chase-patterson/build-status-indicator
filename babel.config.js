module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    ['inline-react-svg',
      {
        'svgo': {
          'plugins': [
            { 'removeUnknownsAndDefaults': false },
            { 'removeUslessDefs': false },
            { 'cleanupIDs': false }
          ]
        }
      }
    ]
  ];

  return {
    presets,
    plugins
  };
}
