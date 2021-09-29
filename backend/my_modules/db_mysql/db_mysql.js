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

function db_deleteSprint(id, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `DELETE FROM sprints WHERE id = ${id} LIMIT 1`;

            con.query(query, (err, result) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    con.end((err) => {
                        if(err) console.log('Disconnection DB error: ', err);
                        else console.log('Disconnection DB OK!');
                    });

                    console.log('Updated rows in projects =', result.changedRows);

                    db_deleteTasksForSprintId(id, callbackSend);
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

function db_updateTask(id, data, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `UPDATE tasks SET title = '${data.title}' WHERE id = '${id}'`;

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

function db_updateTasksTime(tasks_in_doing, callbackSend) {
    const id_project = tasks_in_doing[0].id_project;

    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const deltaTime = DELTA_TIME / ONE_MINUTE_IN_MS;
            const query = `UPDATE tasks SET minutes = minutes + ${deltaTime}  WHERE id_project = ${id_project} AND where_is = 'DOING'`;

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

function db_deleteTask(id, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `DELETE FROM tasks WHERE id = ${id} LIMIT 1`;

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

function db_moveRightTask(id_task, id_sprint, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `SELECT * FROM tasks WHERE id = ${id_task}`;

            con.query(query, (err, array) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    const task = array[0];

                    switch(task.where_is) {
                        case 'BACKLOG':
                            if(id_sprint !== null) {
                                const query2 = `UPDATE tasks SET where_is = 'TODO', id_sprint = ${id_sprint} WHERE id = ${id_task}`;

                                con.query(query2, (err, result) => {
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
                            } else {
                                con.end((err) => {
                                    if(err) console.log('Disconnection DB error: ', err);
                                    else console.log('Disconnection DB OK!');
                                });

                                //send response to client
                                callbackSend();
                            }
                            
                            break;
                        case 'TODO':
                            const query3 = `UPDATE tasks SET where_is = 'DOING' WHERE id = ${id_task}`;

                            con.query(query3, (err, result) => {
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

                            break;
                        case 'DOING':
                            const query4 = `UPDATE tasks SET where_is = 'DONE' WHERE id = ${id_task}`;

                            con.query(query4, (err, result) => {
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

                            break;
                        default:
                    }
                }
            });
        }
    });
}

function db_moveLeftTask(id_task, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `SELECT * FROM tasks WHERE id = ${id_task}`;

            con.query(query, (err, array) => {
                if(err) {
                    console.log('Query error', err);
                } else {
                    const task = array[0];

                    switch(task.where_is) {
                        case 'TODO':
                            const query2 = `UPDATE tasks SET where_is = 'BACKLOG', id_sprint = 0 WHERE id = ${id_task}`;

                            con.query(query2, (err, result) => {
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

                            break;
                        case 'DOING':
                            const query3 = `UPDATE tasks SET where_is = 'TODO' WHERE id = ${id_task}`;

                            con.query(query3, (err, result) => {
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

                            break;
                        case 'DONE':
                            const query4 = `UPDATE tasks SET where_is = 'DOING' WHERE id = ${id_task}`;

                            con.query(query4, (err, result) => {
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

                            break;
                        default:
                    }
                }
            });
        }
    });
}

function db_deleteTasksForSprintId(id_sprint, callbackSend) {
    const con = mysql.createConnection(dbConnectionData);

    con.connect((err) => {
        if(err) {
            console.log('Connection DB error: ', err);
        } else {
            console.log('Connection DB OK!');

            const query = `DELETE FROM tasks WHERE id_sprint = ${id_sprint}`;

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

module.exports = {
    db_getProjects,
    db_getProject,
    db_addProject,
    db_updateProject,
    // db_deleteProject,
    db_getSprintsForProject,
    db_addSprint,
    db_updateSprint,
    db_deleteSprint,
    // db_deleteSprintsForProjectId,
    db_getTasksForProject,
    db_addTask,
    db_updateTask,
    db_updateTasksTime,
    db_deleteTask,
    db_moveRightTask,
    db_moveLeftTask,
    db_deleteTasksForSprintId,
    // db_deleteTasksForProjectId
}