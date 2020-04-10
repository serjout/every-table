const log = ctx => (console.log(ctx),ctx);

module.exports = ctx => ({
    plugins: {
        'postcss-preset-env': {},
        'postcss-import': {},
        'postcss-nested': {},
    }
});
