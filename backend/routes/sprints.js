const db_tmp = require('../my_modules/db_tmp');

module.exports = {
    sprintsRoutes(server) {
        server.get('/api/projects/:id/sprints', (req, res) => {
            const id = Number(req.params.id);
            const sprintsForProject = db_tmp.db_getSprintsForProject(id);

            res.set({'Access-Control-Allow-Origin': '*'});

            res.json(sprintsForProject);
        });
    }
}