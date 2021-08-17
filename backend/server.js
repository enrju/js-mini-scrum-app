const port = process.env.PORT || 3000;
const host = '127.0.0.1';

const express = require('express');
const path = require('path');
// const db_tmp = require('./my_modules/db_tmp');
const {projectsRoutes} = require('./routes/projects');

const server = express();
server.listen(port, host, () => {
    console.log('server is working');
});

server.use(express.static(path.join(__dirname, '../frontend/build')));

//routing here
projectsRoutes(server);