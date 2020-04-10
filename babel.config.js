module.exports = {
    presets: [
        [
            '@babel/preset-env',
        ],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
};
