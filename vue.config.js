module.exports = {
    devServer: {
        proxy: {
            "/api/*": {
                target: "http://localhost:4080",
                changeOrigin: true,
            },
        },
    },
};