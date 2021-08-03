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
    {id: 1, id_project: 1, id_sprint: 1, title: "task 1", where_is: "BACKLOG", minutes: 0},
    {id: 2, id_project: 1, id_sprint: 2, title: "task 2", where_is: "BACKLOG", minutes: 0},
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
        isShowFormAddTask: false,
        //---------------------------
        projectList: [],
        editedProjectIndex: -1,
        isShowFormAddProject: false,
        isShowFormEditProject: false,
    }

    componentDidMount() {
        this.handleGetProjects();
        //MUST BE rendered after update state
        //beacuse this method is call after render()
        this.render();  
    }

    handleGetProjects() {
        let newProjects = projects.map((item, index) => {
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
            //---------------------------
            projectList: newProjects,
            editedProjectIndex: -1,
            isShowFormAddProject: false,
            isShowFormEditProject: false,
        });
    }

    getOpenedProjectSprints(id) {
        let result = sprints
        .filter((item) => {
            if(item.id_project === id) return true;
            else return false;
        })
        .map((item) => {
            let newItem = item;
            newItem.isHide = false;  //default
            return newItem;
        });

        this.setState(() => {
            return ({
                sprintListOpenedProject: result,
            })
        });
    }

    getOpenedProjectTaks(id) {
        let result = tasks
        .filter((item) => {
            if(item.id_project === id) return true;
            else return false;
        });

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
        const nextId = db_calcNextId(projects);

        projects.push({
            id: nextId, 
            ...data
        });

        this.setShowFormAddProject(false);
        this.handleGetProjects();
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
        this.setShowFormAddProject(false);
        this.handleGetProjects();
    }

    handleEditProject(e) {
        e.preventDefault();

        const index = this.state.editedProjectIndex;
        const id = this.state.projectList[index].id;
        this.setEditedProjectIndex(-1);

        const data = this.getDataFromForm();
        const dbIndex = db_findIndexForId(projects, id);

        projects[dbIndex].title = data.title;
        projects[dbIndex].description = data.description;

        this.setShowFormEditProject(false);
        this.handleGetProjects();
    }

    handleDeleteProject(e) {
        e.preventDefault();

        const parent = e.target.parentNode;
        const id = parent.dataset.id;

        const dbIndex = db_findIndexForId(projects, id);

        projects.splice(dbIndex, 1);
        
        this.handleGetProjects();
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
        this.getOpenedProjectSprints(id);
        
        //set state.taskListOpenedProject - setState() inside
        this.getOpenedProjectTaks(id);
        
        this.setState(() => {
            return ({
                idOpenedProject: id,
                //---------------------------
                titleOpenedProject: title,
                descriptionOpenedProject: description,
                isBacklogHide: false,
                idChosenSprint: null,
                //---------------------------
                projectList: [],
                editedProjectIndex: -1,
                isShowFormAddProject: false,
                isShowFormEditProject: false,
            })
        });
    }

    handleCloseProject() {
        this.handleGetProjects();
        this.render();
    }

    handleShowFormAddTask() {
        this.setShowFormAddTask(true);
    }

    handleHideFormAddTask() {
        this.setShowFormAddTask(false);
    }


    handleAddTask(e){
        e.preventDefault();

        const data = this.getDataFromForm();
        const nextId = db_calcNextId(tasks);

        tasks.push({
            id: nextId,
            id_project: this.state.idOpenedProject,
            id_sprint: 1,   //or null for BACKLOG ???
            title: data.title,
            where_is: "BACKLOG", 
            minutes: 0
        });

        this.setShowFormAddTask(false);
        this.getOpenedProjectTaks(this.state.idOpenedProject);
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
                        handleHideShowBacklogDetails={null}
                        handleAddSprint={null}
                        sprintList={this.state.sprintListOpenedProject}
                        taskList={this.state.taskListOpenedProject}
                        handleEditSprint={null}
                        handleDeleteSprint={null}
                        handleHideShowSprintDetails={null}
                        handleEditTask={null}
                        handleDeleteTask={null}
                        handleMoveLeftTask={null}
                        handleMoveRightTask={null}
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
                </main>
            )
        }
    }
}

export default App;
