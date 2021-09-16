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

module.exports = {
    db_getProjects,
    db_getProject,
    // db_addProject,
    // db_updateProject,
    // db_deleteProject,
    // db_getSprintsForProject,
    // db_addSprint,
    // db_updateSprint,
    // db_deleteSprint,
    // db_deleteSprintsForProjectId,
    // db_getTasksForProject,
    // db_addTask,
    // db_updateTask,
    // db_updateTasksTime,
    // db_deleteTask,
    // db_moveRightTask,
    // db_moveLeftTask,
    // db_deleteTasksForSprintId,
    // db_deleteTasksForProjectId
}