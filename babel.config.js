const presets = [
        [
          '@babel/preset-env',
          {
            targets: {
              node: true,
            },
          },
        ],
      ],
      plugins = [
        '@babel/plugin-proposal-optional-chaining',
        [
          '@babel/plugin-transform-runtime',
          { useESModules: true },
        ],
      ]

module.exports = { presets, plugins }
