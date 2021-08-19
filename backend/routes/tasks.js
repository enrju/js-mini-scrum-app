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

        //need options method - see below
        server.put('/api/tasks/:id', (req, res) => {
            let body = '';
            const id = Number(req.params.id);

            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                let obj = JSON.parse(body);
                
                db_tmp.db_updateTask(id, obj);

                res.set({'Access-Control-Allow-Origin': '*'});
                res.send();
            });
        });

        server.put('/api/sprints/:idChosenSprint/tasks/:idTask/:direction', (req, res) => {
            const idChosenSprint = 
            Number(req.params.idChosenSprint) !== -1
            ? Number(req.params.idChosenSprint)
            : null;
            const idTask = Number(req.params.idTask);
            const direction = req.params.direction;

            if(direction === 'right') {
                db_tmp.db_moveRightTask(idTask, idChosenSprint);
            } else if(direction === 'left') {
                db_tmp.db_moveLeftTask(idTask);
            }

            res.set({'Access-Control-Allow-Origin': '*'});
            res.send();
        });

        server.delete('/api/tasks/:id', (req, res) => {
            const id = Number(req.params.id);

            db_tmp.db_deleteTask(id);

            res.set({'Access-Control-Allow-Origin': '*'});
            res.send();
        });

        server.options('/api/tasks/:id', (req, res) => {
            res.set({
                'Allow': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            });
            res.send();
        });

        server.options('/api/sprints/:idChosenSprint/tasks/:idTask/:direction', (req, res) => {
            res.set({
                'Allow': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            });
            res.send();
        });
    }
}