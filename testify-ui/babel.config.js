module.exports = {
    presets: [
        [
            '@babel/preset-env', 
            {
                targets: {
                    node: 'current',
                    chrome: '116',
                },
            },
        ],
        '@babel/preset-javascript',
        "@babel/preset-react"
    ],
};