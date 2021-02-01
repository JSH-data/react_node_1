const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // 프론트(리액트)에서 줄때 이곳으로 주겠다 즉 노드 서버의 포트와 일치한다는 의미
      changeOrigin: true,
    })
  );
}; //cros정책을 해결하기 위해 프록시를 이용하기 위함