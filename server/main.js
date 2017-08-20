import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import express from 'express';
import path from 'path';
import api from './routes'

const app = express();
const port = 3000;
const devPort = 4000;

app.use('/', express.static(path.join(__dirname, './../public')));
app.use('/api', api);

// Error Handling
app.use(function(err, req, res, next) {
    console.err(err.stack);
    req.status(500).send("Something broken!")
})

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