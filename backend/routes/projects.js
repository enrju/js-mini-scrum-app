const db_tmp = require('../my_modules/db_tmp');
const db_mysql = require('../my_modules/db_mysql');

module.exports = {
    projectsRoutes(server) {
        server.get('/api/projects', (req, res) => {
            db_mysql.db_getProjects((projects) => {
                res.set({'Access-Control-Allow-Origin': '*'});
                res.json(projects);
            });
        });

        server.get('/api/projects/:id', (req, res) => {
            const id = Number(req.params.id);
            const project = db_tmp.db_getProject(id);

            res.set({'Access-Control-Allow-Origin': '*'});

            res.json(project);
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

        //need options method - see below
        server.put('/api/projects/:id', (req, res) => {
            let body = '';
            const id = Number(req.params.id);

            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                let obj = JSON.parse(body);
                
                db_tmp.db_updateProject(id, obj);

                res.set({'Access-Control-Allow-Origin': '*'});
                res.send();
            });
        });

        server.delete('/api/projects/:id', (req, res) => {
            const id = Number(req.params.id);

            db_tmp.db_deleteTasksForProjectId(id);
            db_tmp.db_deleteSprintsForProjectId(id);
            db_tmp.db_deleteProject(id);

            res.set({'Access-Control-Allow-Origin': '*'});
            res.send();
        });

        server.options('/api/projects/:id', (req, res) => {
            res.set({
                'Allow': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            });
            res.send();
        });
    }
}