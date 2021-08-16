import React from 'react';

import ProjectListPanel from './ProjectListPanel';
import PopupForm from './PopupForm';
import ProjectPanel from './ProjectPanel';

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

//leave copy this function (or move to utils.js)
// - it's used to find index in table from state
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

class App extends React.Component {
    state = {
        idOpenedProject: null,
        //---------------------------
        titleOpenedProject: '',
        descriptionOpenedProject: '',
        taskListOpenedProject: [],
        sprintListOpenedProject: [],
        isBacklogHide: false,
        idChosenSprint: null,
        //----- new -----
        editedTaskIndex: -1,
        isShowFormAddTask: false,
        isShowFormEditTask: false,
        editedSprintIndex: -1,
        isShowFormAddSprint: false,
        isShowFormEditSprint: false,
        //---------------------------
        projectList: [],
        editedProjectIndex: -1,
        isShowFormAddProject: false,
        isShowFormEditProject: false,
    }

    interval = null;

    oneMinuteInMs = 1000 * 60; //1 minute = 1000ms * 60

    deltaTime = this.oneMinuteInMs * 1;

    componentDidMount() {
        this.setProjectList();
        //MUST BE rendered after update state
        //beacuse this method is call after render()
        this.render();  
    }

    setProjectList() {
        let newProjects = db_getProjects()
        .map((item) => {
            let newItem = item;
            newItem.isHide = true;  //default
            return newItem;
        });

        this.setState({
            idOpenedProject: null,
            //---------------------------
            titleOpenedProject: '',
            descriptionOpenedProject: '',
            taskListOpenedProject: [],
            sprintListOpenedProject: [],
            isBacklogHide: false,
            idChosenSprint: null,
            editedTaskIndex: -1,
            isShowFormAddTask: false,
            isShowFormEditTask: false,
            editedSprintIndex: -1,
            isShowFormAddSprint: false,
            isShowFormEditSprint: false,
            //---------------------------
            projectList: newProjects,
            editedProjectIndex: -1,
            isShowFormAddProject: false,
            isShowFormEditProject: false,
        });
    }

    setSprintListOpenedProject(id) {
        let result = db_getSprintsForProject(id)
        .map((item) => {
            let newItem = item;
            newItem.isHide = false;  //default
            return newItem;
        });

        //default chosen first sprint if exist
        const idChosenSprint = result.length > 0 ? result[0].id : null;

        this.setState(() => {
            return ({
                sprintListOpenedProject: result,
                idChosenSprint: idChosenSprint,
            })
        });
    }

    setTaskListOpenedProject(id) {
        let result = db_getTasksForProject(id);

        this.setState(() => {
            return ({
                taskListOpenedProject: result,
            })
        });
    }

    setShowFormAddProject(bool) {
        this.setState(() => {
            return ({
                isShowFormAddProject: bool
            })
        });
    }

    setShowFormEditProject(bool) {
        this.setState(() => {
            return ({
                isShowFormEditProject: bool
            })
        });
    }

    setEditedProjectIndex(index) {
        this.setState(() => {
            return ({
                editedProjectIndex: index
            })
        });
    }

    setShowFormAddTask(bool) {
        this.setState(() => {
            return ({
                isShowFormAddTask: bool
            })
        });
    }

    setShowFormEditTask(bool) {
        this.setState(() => {
            return ({
                isShowFormEditTask: bool
            })
        });
    }

    setEditedTaskIndex(index) {
        this.setState(() => {
            return ({
                editedTaskIndex: index
            })
        });
    }

    setShowFormAddSprint(bool) {
        this.setState(() => {
            return ({
                isShowFormAddSprint: bool
            })
        });
    }

    setShowFormEditSprint(bool) {
        this.setState(() => {
            return ({
                isShowFormEditSprint: bool
            })
        });
    }

    setEditedSprintIndex(index) {
        this.setState(() => {
            return ({
                editedSprintIndex: index
            })
        });
    }

    getDataFromForm(){
        const inpTitle = document.querySelector("input[name='title']");
        const inpDescription = document.querySelector("textarea[name='description']");
        
        const title = inpTitle.value;
        const description = inpDescription ? inpDescription.value : null;

        if(inpDescription) {
            return {
                title,
                description
            }
        } else {
            return {
                title
            }
        }
        
    }

    handleShowFormAddProject() {
        this.setShowFormAddProject(true);
    }

    handleHideFormAddProject() {
        this.setShowFormAddProject(false);
    }

    handleAddProject(e) {
        e.preventDefault();

        const data = this.getDataFromForm();

        db_addProject(data);

        this.setShowFormAddProject(false);
        this.setProjectList();
    }

    handleShowFormEditProject(e) {
        e.preventDefault();

        const parent = e.target.parentNode;
        const id = parent.dataset.id;
    
        let index = -1;
        for(let i = 0; i < this.state.projectList.length; i++) {
            if(this.state.projectList[i].id === Number(id)) {
                index = i;
                break;
            }
        }

        this.setShowFormEditProject(true);
        this.setEditedProjectIndex(index);
    }

    handleHideFormEditProject() {
        this.setShowFormEditProject(false);
    }

    handleEditProject(e) {
        e.preventDefault();

        const index = this.state.editedProjectIndex;
        const id = this.state.projectList[index].id;
        this.setEditedProjectIndex(-1);

        const data = this.getDataFromForm();

        db_updateProject(id, data);

        this.setShowFormEditProject(false);
        this.setProjectList();
    }

    handleDeleteProject(e) {
        e.preventDefault();

        const parent = e.target.parentNode;
        const id = Number(parent.dataset.id);

        const decision = window.confirm('All tasks and sprints inside project will be deleted!');

        if(decision) {
            db_deleteTasksForProjectId(id);
            db_deleteSprintsForProjectId(id);
            db_deleteProject(id);
            
            this.setProjectList();
        }
    }

    handleHideShowProjectDescription(e) {
        e.preventDefault();

        const parent = e.target.parentNode;
        const id = parent.dataset.id;

        const index = db_findIndexForId(this.state.projectList, id);

        //copy of table
        let newProjectList = [ ...this.state.projectList ];
        
        newProjectList[index].isHide = !newProjectList[index].isHide;

        this.setState(() => {
            return ({
                projectList: newProjectList
            })
        });

        //don't get projects from DB 
        //because changes are only in state from App
    }

    handleOpenProject(e){
        e.preventDefault();

        const parent = e.target.parentNode;
        const id = Number(parent.dataset.id);
        const index = db_findIndexForId(projects, id);
        const title = projects[index].title;
        const description = projects[index].description;

        //set state.sprintListOpenedProject - setState() inside
        this.setSprintListOpenedProject(id);
        
        //set state.taskListOpenedProject - setState() inside
        this.setTaskListOpenedProject(id);

        this.interval = setInterval(this.handleUpdateTaskTime.bind(this), this.deltaTime);

        this.setState(() => {
            return ({
                idOpenedProject: id,
                //---------------------------
                titleOpenedProject: title,
                descriptionOpenedProject: description,
                // taskListOpenedProject: [],   //this was set above
                // sprintListOpenedProject: [], //this was set above
                isBacklogHide: false,
                // idChosenSprint: null,    //this was set above
                editedTaskIndex: -1,
                isShowFormAddTask: false,
                isShowFormEditTask: false,
                editedSprintIndex: -1,
                isShowFormAddSprint: false,
                isShowFormEditSprint: false,
                //---------------------------
                projectList: [],
                editedProjectIndex: -1,
                isShowFormAddProject: false,
                isShowFormEditProject: false,
            })
        });
    }

    handleCloseProject() {
        clearInterval(this.interval);
        this.setProjectList();
        this.render();
    }

    handleShowFormAddTask() {
        this.setShowFormAddTask(true);
    }

    handleHideFormAddTask() {
        this.setShowFormAddTask(false);
    }

    handleAddTask(e) {
        e.preventDefault();

        const data = this.getDataFromForm();

        db_addTask(this.state.idOpenedProject, data);

        this.setShowFormAddTask(false);
        this.setTaskListOpenedProject(this.state.idOpenedProject);
    }

    handleHideShowBacklogDetails(){
        this.setState((prevState) => {
            return ({
                isBacklogHide: !prevState.isBacklogHide
            })
        });
    }

    handleShowFormEditTask(e) {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const id = Number(parent.dataset.id);
    
        let index = -1;
        for(let i = 0; i < this.state.taskListOpenedProject.length; i++) {
            if(this.state.taskListOpenedProject[i].id === Number(id)) {
                index = i;
                break;
            }
        }

        this.setShowFormEditTask(true);
        this.setEditedTaskIndex(index);
    }

    handleHideFormEditTask() {
        this.setShowFormEditTask(false);
    }

    handleEditTask(e) {
        e.preventDefault();

        const index = this.state.editedTaskIndex;
        const id = this.state.taskListOpenedProject[index].id;
        this.setEditedTaskIndex(-1);

        const data = this.getDataFromForm();
        
        db_updateTask(id, data);

        this.setShowFormEditTask(false);
        this.setTaskListOpenedProject(this.state.idOpenedProject);
    }

    handleDeleteTask(e) {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        db_deleteTask(id);
        
        this.setTaskListOpenedProject(this.state.idOpenedProject);
    }

    handleChooseSprint(e) {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        this.setState(() => {
            return ({
                idChosenSprint: id,
            })
        });
    }

    handleMoveRightTask(e) {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        db_moveRightTask(id, this.state.idChosenSprint);

        this.setTaskListOpenedProject(this.state.idOpenedProject);
    }

    handleMoveLeftTask(e) {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        db_moveLeftTask(id);

        this.setTaskListOpenedProject(this.state.idOpenedProject);
    }

    handleShowFormAddSprint() {
        this.setShowFormAddSprint(true);
    }

    handleHideFormAddSprint() {
        this.setShowFormAddSprint(false);
    }

    handleAddSprint(e) {
        e.preventDefault();

        const data = this.getDataFromForm();

        db_addSprint(this.state.idOpenedProject, data);

        this.setShowFormAddSprint(false);
        this.setSprintListOpenedProject(this.state.idOpenedProject);
    }

    handleShowFormEditSprint(e) {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode.parentNode;
        const id = Number(parent.dataset.id);
    
        let index = -1;
        for(let i = 0; i < this.state.sprintListOpenedProject.length; i++) {
            if(this.state.sprintListOpenedProject[i].id === Number(id)) {
                index = i;
                break;
            }
        }

        this.setShowFormEditSprint(true);
        this.setEditedSprintIndex(index);
    }

    handleHideFormEditSprint() {
        this.setShowFormEditSprint(false);
    }

    handleEditSprint(e) {
        e.preventDefault();

        const index = this.state.editedSprintIndex;
        const id = this.state.sprintListOpenedProject[index].id;
        this.setEditedSprintIndex(-1);

        const data = this.getDataFromForm();
        
        db_updateSprint(id, data);

        this.setShowFormEditSprint(false);
        this.setSprintListOpenedProject(this.state.idOpenedProject);
    }

    handleDeleteSprint(e) {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        const decision = window.confirm('All tasks inside sprint will be deleted!');

        if(decision) {
            db_deleteTasksForSprintId(id);

            const dbIndex = db_findIndexForId(sprints, id);

            sprints.splice(dbIndex, 1);
            
            this.setSprintListOpenedProject(this.state.idOpenedProject);
        }
    }

    handleHideShowSprintDetails(e){
        e.preventDefault();

        const parent = e.target.parentNode.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        const copyTab = [...this.state.sprintListOpenedProject];

        const stateIndex = db_findIndexForId(copyTab, id);

        copyTab[stateIndex].isHide = !copyTab[stateIndex].isHide;

        this.setState(() => {
            return ({
                sprintListOpenedProject: copyTab
            })
        });
    }

    handleUpdateTaskTime(){
        const tasksInDoing = 
        this.state.taskListOpenedProject.filter((item) => {
            if(item.where_is === "DOING") return true;
            else return false;
        });

        tasksInDoing.forEach((item) => {
            const index = db_findIndexForId(tasks, item.id);
            tasks[index].minutes += this.deltaTime / this.oneMinuteInMs;
        });

        this.setTaskListOpenedProject(this.state.idOpenedProject);
    }

    render() {
        // console.log('state = ', this.state);
        if(this.state.idOpenedProject === null) {
            return (
                <main>
                    <ProjectListPanel
                        projectList={this.state.projectList}
                        handleAddProject={this.handleShowFormAddProject.bind(this)}
                        handleEditProject={this.handleShowFormEditProject.bind(this)}
                        handleDeleteProject={this.handleDeleteProject.bind(this)}
                        handleHideShowProject={this.handleHideShowProjectDescription.bind(this)}
                        handleOpenProject={this.handleOpenProject.bind(this)}
                    />
                    {this.state.isShowFormAddProject ?
                        <PopupForm
                            handleSubmitForm={this.handleAddProject.bind(this)}
                            name = "new project"
                            isDescription={true}
                            title=""
                            description=""
                            handleCancelAddBtn={this.handleHideFormAddProject.bind(this)}
                            handleAddBtn={null}
                        />
                        : null
                    }
                    {this.state.isShowFormEditProject ?
                        <PopupForm
                            handleSubmitForm={this.handleEditProject.bind(this)}
                            name = "edit project"
                            isDescription={true}
                            title={this.state.projectList[this.state.editedProjectIndex].title}
                            description={this.state.projectList[this.state.editedProjectIndex].description}
                            handleCancelAddBtn={this.handleHideFormEditProject.bind(this)}
                            handleAddBtn={null}
                        />
                        : null
                    }
                </main>
            )
        } else {
            return (
                // <!--    JSX - WYMAGA encji HTML  -->
                // <!--    <	&#60; &#x003C;  -->
                // <!--    >	&#62; &#x003E;	-->
                // <!--    /	&#47; &#x002F;  -->
                <main>
                    <ProjectPanel
                        title={this.state.titleOpenedProject}
                        description={this.state.descriptionOpenedProject}
                        handleCloseProject={this.handleCloseProject.bind(this)}
                        handleAddTask={this.handleShowFormAddTask.bind(this)}
                        isBacklogHide={this.state.isBacklogHide}
                        handleHideShowBacklogDetails={this.handleHideShowBacklogDetails.bind(this)}
                        handleAddSprint={this.handleShowFormAddSprint.bind(this)}
                        idChosenSprint={this.state.idChosenSprint}
                        sprintList={this.state.sprintListOpenedProject}
                        taskList={this.state.taskListOpenedProject}
                        handleChooseSprint={this.handleChooseSprint.bind(this)}
                        handleEditSprint={this.handleShowFormEditSprint.bind(this)}
                        handleDeleteSprint={this.handleDeleteSprint.bind(this)}
                        handleHideShowSprintDetails={this.handleHideShowSprintDetails.bind(this)}
                        handleEditTask={this.handleShowFormEditTask.bind(this)}
                        handleDeleteTask={this.handleDeleteTask.bind(this)}
                        handleMoveLeftTask={this.handleMoveLeftTask.bind(this)}
                        handleMoveRightTask={this.handleMoveRightTask.bind(this)}
                    />
                    {this.state.isShowFormAddTask ?
                        <PopupForm
                            handleSubmitForm={this.handleAddTask.bind(this)}
                            name = "new task"
                            isDescription={false}
                            title=""
                            description=""
                            handleCancelAddBtn={this.handleHideFormAddTask.bind(this)}
                            handleAddBtn={null}
                        />
                        : null
                    }
                    {this.state.isShowFormEditTask ?
                        <PopupForm
                            handleSubmitForm={this.handleEditTask.bind(this)}
                            name = "edit task"
                            isDescription={false}
                            title={this.state.taskListOpenedProject[this.state.editedTaskIndex].title}
                            description=""
                            handleCancelAddBtn={this.handleHideFormEditTask.bind(this)}
                            handleAddBtn={null}
                        />
                        : null
                    }
                    {this.state.isShowFormAddSprint ?
                        <PopupForm
                            handleSubmitForm={this.handleAddSprint.bind(this)}
                            name = "new sprint"
                            isDescription={false}
                            title=""
                            description=""
                            handleCancelAddBtn={this.handleHideFormAddSprint.bind(this)}
                            handleAddBtn={null}
                        />
                        : null
                    }
                    {this.state.isShowFormEditSprint ?
                        <PopupForm
                            handleSubmitForm={this.handleEditSprint.bind(this)}
                            name = "edit sprint"
                            isDescription={false}
                            title={this.state.sprintListOpenedProject[this.state.editedSprintIndex].title}
                            description=""
                            handleCancelAddBtn={this.handleHideFormEditSprint.bind(this)}
                            handleAddBtn={null}
                        />
                        : null
                    }
                </main>
            )
        }
    }
}

export default App;
