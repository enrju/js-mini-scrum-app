const db_tmp = require('../my_modules/db_tmp');

module.exports = {
    projectsRoutes(server) {
        server.get('/api/projects', (req, res) => {
            const projects = db_tmp.db_getProjects();

            res.set({'Access-Control-Allow-Origin': '*'});

            res.json(projects);
        });

        server.post('/api/projects', (req, res) => {
            let body = '';

            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                let obj = JSON.parse(body);
                db_tmp.db_addProject(obj);

                res.set({'Access-Control-Allow-Origin': '*'});
                res.send();
            });
        });
    }
}