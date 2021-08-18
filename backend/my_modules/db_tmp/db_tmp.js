const ONE_MINUTE_IN_MS = 1000 * 60; //1 minute = 1000ms * 60;

// - it's used in frontend too
const DELTA_TIME = ONE_MINUTE_IN_MS * 1;

let projects = [
    {id: 1, title: "project 1", description: "project 1"},
    {id: 2, title: "project 2", description: "project 2"},
    {id: 3, title: "project 3", description: "project 3"},
];

let sprints = [
    {id: 1, id_project: 1, title: "sprint - week 1"},
    {id: 2, id_project: 1, title: "sprint - week 2"},
    {id: 3, id_project: 2, title: "sprint - week 3"},
];

let tasks = [
    {id: 1, id_project: 1, id_sprint: null, title: "task 1", where_is: "BACKLOG", minutes: 0},
    {id: 2, id_project: 1, id_sprint: null, title: "task 2", where_is: "BACKLOG", minutes: 0},
    {id: 3, id_project: 1, id_sprint: 1, title: "task 3", where_is: "TODO", minutes: 0},
    {id: 4, id_project: 1, id_sprint: 2, title: "task 4", where_is: "DOING", minutes: 0},
    {id: 5, id_project: 2, id_sprint: 3, title: "task 5", where_is: "DOING", minutes: 0},
    {id: 6, id_project: 1, id_sprint: 1, title: "task 6", where_is: "DONE", minutes: 0},
    {id: 7, id_project: 1, id_sprint: 2, title: "task 7", where_is: "DONE", minutes: 0},
    {id: 8, id_project: 2, id_sprint: 3, title: "task 8", where_is: "DONE", minutes: 0},
];

function db_calcNextId(table) {
    let maxId = 0;
    
    table.forEach(item => {
        if(item.id > maxId) maxId = item.id;
    });

    return maxId + 1;
}

// - it's used in frontend too
function db_findIndexForId(table, id) {
    let index = -1;

    for(let i = 0; i < table.length; i++) {
        if(table[i].id === Number(id)) {
            index = i;
            break;
        }
    }

    return index;
}

function db_getProjects() {
    return projects;
}

function db_addProject(data) {
    const nextId = db_calcNextId(projects);

    projects.push({
        id: nextId, 
        ...data
    });
}

function db_updateProject(id, data) {
    const dbIndex = db_findIndexForId(projects, id);

    projects[dbIndex].title = data.title;
    projects[dbIndex].description = data.description;
}

function db_deleteProject(id) {
    const dbIndex = db_findIndexForId(projects, id);

    projects.splice(dbIndex, 1);
}

function db_getSprintsForProject(id) {
    return sprints.filter((item) => {
        if(item.id_project === id) return true;
        else return false;
    });
}

function db_addSprint(id_project, data) {
    const nextId = db_calcNextId(sprints);

    sprints.push({
        id: nextId, 
        id_project: id_project, 
        title: data.title
    });
}

function db_updateSprint(id, data) {
    const dbIndex = db_findIndexForId(sprints, id);

    sprints[dbIndex].title = data.title;
}

function db_deleteSprint(id) {
    const dbIndex = db_findIndexForId(sprints, id);

    sprints.splice(dbIndex, 1);
}

function db_deleteSprintsForProjectId(id_project) {
    let finish = false;

    while(!finish) {
        for(let i = 0; i < sprints.length; i++) {
            if(sprints[i].id_project === id_project) {
                sprints.splice(i, 1);
                break;
            }
            if(i === sprints.length - 1) {
                finish = true;
            }
        }
    }
}

function db_getTasksForProject(id) {
    return tasks.filter((item) => {
        if(item.id_project === id) return true;
        else return false;
    });
}

function db_addTask(id_project, data) {
    const nextId = db_calcNextId(tasks);

    tasks.push({
        id: nextId,
        id_project: id_project,
        id_sprint: null,   //for BACKLOG
        title: data.title,
        where_is: "BACKLOG", 
        minutes: 0
    });
}

function db_updateTask(id, data) {
    const dbIndex = db_findIndexForId(tasks, id);

    tasks[dbIndex].title = data.title;
}

function db_updateTasksTime(tasks_in_doing) {
    tasks_in_doing.forEach((item) => {
        const index = db_findIndexForId(tasks, item.id);
        tasks[index].minutes += DELTA_TIME / ONE_MINUTE_IN_MS;
    });
}

function db_deleteTask(id) {
    const dbIndex = db_findIndexForId(tasks, id);

    tasks.splice(dbIndex, 1);
}

function db_moveRightTask(id_task, id_sprint) {
    const dbIndex = db_findIndexForId(tasks, id_task);

    switch(tasks[dbIndex].where_is) {
        case 'BACKLOG':
            if(id_sprint !== null) {
                tasks[dbIndex].where_is = 'TODO';
                tasks[dbIndex].id_sprint = id_sprint;
            }
            break;
        case 'TODO':
            tasks[dbIndex].where_is = 'DOING';
            break;
        case 'DOING':
            tasks[dbIndex].where_is = 'DONE';
            break;
        default:
    }
}

function db_moveLeftTask(id) {
    const dbIndex = db_findIndexForId(tasks, id);

    switch(tasks[dbIndex].where_is) {
        case 'TODO':
            tasks[dbIndex].where_is = 'BACKLOG';
            tasks[dbIndex].id_sprint = null;
            break;
        case 'DOING':
            tasks[dbIndex].where_is = 'TODO';
            break;
        case 'DONE':
            tasks[dbIndex].where_is = 'DOING';
            break;
        default:
    }
}

function db_deleteTasksForSprintId(id_sprint) {
    let finish = false;

    while(!finish) {
        for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].id_sprint === id_sprint) {
                tasks.splice(i, 1);
                break;
            }
            if(i === tasks.length - 1) {
                finish = true;
            }
        }
    }
}

function db_deleteTasksForProjectId(id_project) {
    let finish = false;

    while(!finish) {
        for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].id_project === id_project) {
                tasks.splice(i, 1);
                break;
            }
            if(i === tasks.length - 1) {
                finish = true;
            }
        }
    }
}

module.exports = {
    db_calcNextId,
    db_findIndexForId,
    db_getProjects,
    db_addProject,
    db_updateProject,
    db_deleteProject,
    db_getSprintsForProject,
    db_addSprint,
    db_updateSprint,
    db_deleteSprint,
    db_deleteSprintsForProjectId,
    db_getTasksForProject,
    db_addTask,
    db_updateTask,
    db_updateTasksTime,
    db_deleteTask,
    db_moveRightTask,
    db_moveLeftTask,
    db_deleteTasksForSprintId,
    db_deleteTasksForProjectId
}