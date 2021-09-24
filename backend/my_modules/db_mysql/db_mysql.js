const mysql = require('mysql');

const ONE_MINUTE_IN_MS = 1000 * 60; //1 minute = 1000ms * 60;

// - it's used in frontend too
const DELTA_TIME = ONE_MINUTE_IN_MS * 1;

const dbConnectionData = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mini_scrum_app',
    charset: 'utf8_polish_ci'
};

function db_getProjects(callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = 'SELECT * FROM projects';

            con.query(query, (err, array) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    con.end((err) => {
                        if(err) console.log('Disconnection DB error: ', err);
                        else console.log('Disconnection DB OK!');
                    });

                    const projects = array;

                    //send response to client
                    callbackSend(projects);
                }
            });
        }
    });
}

function db_getProject(id, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `SELECT * FROM projects WHERE id=${id}`;

            con.query(query, (err, array) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    con.end((err) => {
                        if(err) console.log('Disconnection DB error: ', err);
                        else console.log('Disconnection DB OK!');
                    });

                    const project = array[0];

                    //send response to client
                    callbackSend(project);
                }
            });
        }
    });
}

function db_addProject(data, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `INSERT INTO projects (title, description) VALUES ('${data.title}', '${data.description}')`;

            con.query(query, (err, result) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    con.end((err) => {
                        if(err) console.log('Disconnection DB error: ', err);
                        else console.log('Disconnection DB OK!');
                    });

                    console.log('Inserted project on id =', result.insertId);

                    //send response to client
                    callbackSend();
                }
            });
        }
    });
}

function db_updateProject(id, data, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `UPDATE projects SET title = '${data.title}', description = '${data.description}' WHERE id = '${id}'`;

            con.query(query, (err, result) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    con.end((err) => {
                        if(err) console.log('Disconnection DB error: ', err);
                        else console.log('Disconnection DB OK!');
                    });

                    console.log('Updated rows in projects =', result.changedRows);

                    //send response to client
                    callbackSend();
                }
            });
        }
    });
}

function db_getSprintsForProject(id, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `SELECT * FROM sprints WHERE id_project = ${id}`;

            con.query(query, (err, array) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    con.end((err) => {
                        if(err) console.log('Disconnection DB error: ', err);
                        else console.log('Disconnection DB OK!');
                    });

                    const sprints = array;

                    //send response to client
                    callbackSend(sprints);
                }
            });
        }
    });
}

function db_addSprint(id_project, data, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `INSERT INTO sprints (id_project, title) VALUES ('${id_project}', '${data.title}')`;

            con.query(query, (err, result) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    con.end((err) => {
                        if(err) console.log('Disconnection DB error: ', err);
                        else console.log('Disconnection DB OK!');
                    });

                    console.log('Inserted project on id =', result.insertId);

                    //send response to client
                    callbackSend();
                }
            });
        }
    });
}

function db_updateSprint(id, data, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `UPDATE sprints SET title = '${data.title}' WHERE id = '${id}'`;

            con.query(query, (err, result) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    con.end((err) => {
                        if(err) console.log('Disconnection DB error: ', err);
                        else console.log('Disconnection DB OK!');
                    });

                    console.log('Updated rows in projects =', result.changedRows);

                    //send response to client
                    callbackSend();
                }
            });
        }
    });
}

function db_getTasksForProject(id, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `SELECT * FROM tasks WHERE id_project = ${id}`;

            con.query(query, (err, array) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    con.end((err) => {
                        if(err) console.log('Disconnection DB error: ', err);
                        else console.log('Disconnection DB OK!');
                    });

                    const tasks = array;

                    //send response to client
                    callbackSend(tasks);
                }
            });
        }
    });
}

function db_addTask(id_project, data, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            //id_sprint = 0 for BACKLOG
            //minutes = 0 for new task
            const query = `INSERT INTO tasks (id_project, id_sprint, title, where_is, minutes) VALUES ('${id_project}', 0, '${data.title}', 'BACKLOG', 0)`;

            con.query(query, (err, result) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    con.end((err) => {
                        if(err) console.log('Disconnection DB error: ', err);
                        else console.log('Disconnection DB OK!');
                    });

                    console.log('Inserted project on id =', result.insertId);

                    //send response to client
                    callbackSend();
                }
            });
        }
    });
}

module.exports = {
    db_getProjects,
    db_getProject,
    db_addProject,
    db_updateProject,
    // db_deleteProject,
    db_getSprintsForProject,
    db_addSprint,
    db_updateSprint,
    // db_deleteSprint,
    // db_deleteSprintsForProjectId,
    db_getTasksForProject,
    db_addTask,
    // db_updateTask,
    // db_updateTasksTime,
    // db_deleteTask,
    // db_moveRightTask,
    // db_moveLeftTask,
    // db_deleteTasksForSprintId,
    // db_deleteTasksForProjectId
}