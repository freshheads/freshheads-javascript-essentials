// babel is only used for the jest tests, not for the library build
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: true,
                },
            },
        ],
        '@babel/preset-typescript',
        '@babel/preset-react',
    ],
};
