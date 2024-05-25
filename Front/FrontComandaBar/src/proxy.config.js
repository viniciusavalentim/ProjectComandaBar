const PROXY_CONFIG = [
    {
        context: [
            '/api',
            '/Card'

        ],
        target: "https://localhost:7269",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/": ""
        }
    }

]

module.exports = PROXY_CONFIG;