const db_tmp = require('../my_modules/db_tmp');

module.exports = {
    sprintsRoutes(server) {
        server.get('/api/projects/:id/sprints', (req, res) => {
            const id = Number(req.params.id);
            const sprintsForProject = db_tmp.db_getSprintsForProject(id);

            res.set({'Access-Control-Allow-Origin': '*'});

            res.json(sprintsForProject);
        });

        server.post('/api/projects/:id/sprints', (req, res) => {
            const idProject = Number(req.params.id);
            
            let body = '';

            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                let obj = JSON.parse(body);

                db_tmp.db_addSprint(idProject, obj);

                res.set({'Access-Control-Allow-Origin': '*'});
                res.send();
            });
        });

        //need options method - see below
        server.put('/api/sprints/:id', (req, res) => {
            let body = '';
            const id = Number(req.params.id);

            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                let obj = JSON.parse(body);
                
                db_tmp.db_updateSprint(id, obj);

                res.set({'Access-Control-Allow-Origin': '*'});
                res.send();
            });
        });

        server.options('/api/sprints/:id', (req, res) => {
            res.set({
                'Allow': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            });
            res.send();
        });
    }
}