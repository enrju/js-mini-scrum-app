const db_tmp = require('../my_modules/db_tmp');

module.exports = {
    projectsRoutes(server) {
        server.get('/api/projects', (req, res) => {
            const projects = db_tmp.db_getProjects();

            res.set({'Access-Control-Allow-Origin': '*'});

            res.json(projects);
        });

        server.get('/api/projects/:id', (req, res) => {
            const id = Number(req.params.id);
            const project = db_tmp.db_getProject(id);

            res.set({'Access-Control-Allow-Origin': '*'});

            res.json(project);
        });

        server.get('/api/projects/:id/tasks', (req, res) => {
            const id = Number(req.params.id);
            const tasksForProject = db_tmp.db_getTasksForProject(id);

            res.set({'Access-Control-Allow-Origin': '*'});

            res.json(tasksForProject);
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

        server.post('/api/projects/:id/tasks', (req, res) => {
            const idProject = Number(req.params.id);
            
            let body = '';

            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                let obj = JSON.parse(body);

                db_tmp.db_addTask(idProject, obj);

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