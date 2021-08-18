const db_tmp = require('../my_modules/db_tmp');

module.exports = {
    projectsRoutes(server) {
        server.get('/api/projects', (req, res) => {
            const projects = db_tmp.db_getProjects();

            res.set({'Access-Control-Allow-Origin': '*'});

            res.json(projects);
        });
    }
}