const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/pedal',
        createProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true,
        })
    )
}

module.exports = (app) => {
    app.use(
        "/ws",
        createProxyMiddleware({ target: "http://localhost:8787", ws: true })
    );
};