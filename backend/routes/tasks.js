const db_tmp = require('../my_modules/db_tmp');

module.exports = {
    tasksRoutes(server) {
        server.get('/api/projects/:id/tasks', (req, res) => {
            const id = Number(req.params.id);
            const tasksForProject = db_tmp.db_getTasksForProject(id);

            res.set({'Access-Control-Allow-Origin': '*'});

            res.json(tasksForProject);
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
    }
}