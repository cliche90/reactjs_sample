let WebpackDevServer = require('webpack-dev-server');
let webpack = require('webpack');
let express = require('express');
let path = require('path');

const app = express();
const port = 3000;
const devPort = 4000;

app.use('/', express.static(path.join(__dirname, './../public')));

app.get('/hello', (req, res) => {
    return res.send('Hello Codelab');
});

app.listen(port, (err) => console.log('Express is listening on port ' + port));

// 개발 서버일 때
if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, (err) =>{
        console.log('webpack-dev-server is listening on port ' + devPort);
    }); 
}