import React from 'react';

import ProjectListPanel from './ProjectListPanel';
import PopupForm from './PopupForm';
import TaskList from './TaskList';
import SprintList from './SprintList';
import BacklogPanel from './BacklogPanel';

let projects = [
    {id: 1, title: "project 1", description: "project 1"},
    {id: 2, title: "project 2", description: "project 2"},
    {id: 3, title: "project 3", description: "project 3"},
];

let tasks = [
    {id: 1, id_project: 1, id_sprint: null, title: "task 1", where_is: "BACKLOG", minutes: 0},
    {id: 2, id_project: 1, id_sprint: 1, title: "task 2", where_is: "TODO", minutes: 0},
];

let sprints = [
    {id: 1, id_project: 1, title: "sprint - week 1"},
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

    getDataFromForm(){
        const inpTitle = document.querySelector("input[name='title']");
        const inpDescription = document.querySelector("textarea[name='description']");
        
        const title = inpTitle.value;
        const description = inpDescription.value;

        return {
            title,
            description
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
    }

    handleEditProject() {
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
        const id = parent.dataset.id;
        const index = db_findIndexForId(projects, id);
        const title = projects[index].title;
        const description = projects[index].description;

        //tmp using variable to fix warnings
        tasks.map(() => {return true});
        sprints.map(() => {return true});
        //----------------------------------
        
        this.setState(() => {
            return ({
                idOpenedProject: id,
                //---------------------------
                titleOpenedProject: title,
                descriptionOpenedProject: description,
                taskListOpenedProject: [],
                sprintListOpenedProject: [],
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

    render() {
        // console.log('idOpenedProject = ', this.state.idOpenedProject);
        if(this.state.idOpenedProject === null) {
            return (
                <>
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
                            name = "new project"
                            isDescription={true}
                            title=""
                            description=""
                            handleCancelAddBtn={this.handleHideFormAddProject.bind(this)}
                            handleAddBtn={this.handleAddProject.bind(this)}
                        />
                        : null
                    }
                    {this.state.isShowFormEditProject ?
                        <PopupForm
                            name = "edit project"
                            isDescription={true}
                            title={this.state.projectList[this.state.editedProjectIndex].title}
                            description={this.state.projectList[this.state.editedProjectIndex].description}
                            handleCancelAddBtn={this.handleHideFormEditProject.bind(this)}
                            handleAddBtn={this.handleEditProject.bind(this)}
                        />
                        : null
                    }
                </>
            )
        } else {
            const tmpSprintList = [
                {
                    id: 1, 
                    id_project: 1, 
                    title: "sprint - week 1",
                    isHide: false
                },
                {
                    id: 2, 
                    id_project: 1, 
                    title: "sprint - week 2",
                    isHide: false
                },
                {
                    id: 3, 
                    id_project: 1, 
                    title: "sprint - week 3",
                    isHide: false
                },
            ];
            const tmpTaskList = [
                {
                    id: 1, 
                    id_project: 1, 
                    id_sprint: 1, 
                    title: "task 1", 
                    where_is: "BACKLOG", 
                    minutes: 0
                },
                {
                    id: 2, 
                    id_project: 1, 
                    id_sprint: 2, 
                    title: "task 2", 
                    where_is: "BACKLOG", 
                    minutes: 0
                },
                {
                    id: 3, 
                    id_project: 1, 
                    id_sprint: 1, 
                    title: "task 3", 
                    where_is: "TODO", 
                    minutes: 0
                },
                {
                    id: 4, 
                    id_project: 1, 
                    id_sprint: 2, 
                    title: "task 4", 
                    where_is: "DOING", 
                    minutes: 0
                },
                {
                    id: 5, 
                    id_project: 1, 
                    id_sprint: 3, 
                    title: "task 5", 
                    where_is: "DOING", 
                    minutes: 0
                },
                {
                    id: 6, 
                    id_project: 1, 
                    id_sprint: 1, 
                    title: "task 6", 
                    where_is: "DONE", 
                    minutes: 0
                },
                {
                    id: 7, 
                    id_project: 1, 
                    id_sprint: 2, 
                    title: "task 7", 
                    where_is: "DONE", 
                    minutes: 0
                },
                {
                    id: 8, 
                    id_project: 1, 
                    id_sprint: 3, 
                    title: "task 8", 
                    where_is: "DONE", 
                    minutes: 0
                },
            ];
            return (
                // <!--    JSX - WYMAGA encji HTML  -->
                // <!--    <	&#60; &#x003C;  -->
                // <!--    >	&#62; &#x003E;	-->
                // <!--    /	&#47; &#x002F;  -->
                <main>
                    <header>
                        <h1>PROJECT</h1>
                        <h2>{this.state.titleOpenedProject}</h2>
                        <p>{this.state.descriptionOpenedProject}</p>
                        <button 
                            onClick={this.handleCloseProject.bind(this)}
                        >Close</button>
                    </header>
                    <section>
                        <div className="backlog">
                            <BacklogPanel
                                handleAddTask={null}
                                handleHideShowBacklogDetails={null}
                                taskList={tmpTaskList}
                                handleEditTask={null}
                                handleDeleteTask={null}
                                handleMoveLeftTask={null}
                                handleMoveRightTask={null}
                            />
                        </div>
                        <div className="sprints">
                            <header>
                                <h2>SPRINTS</h2>
                                <button>+sprint</button>
                            </header>
                            <section>
                                <SprintList
                                    sprintList={tmpSprintList}
                                    taskList={tmpTaskList}
                                    handleEditSprint={null}
                                    handleDeleteSprint={null}
                                    handleHideShowSprintDetails={null}
                                    handleEditTask={null}
                                    handleDeleteTask={null}
                                    handleMoveLeftTask={null}
                                    handleMoveRightTask={null}
                                />
                            </section>
                        </div>
                    </section>
                </main>
            )
        }
    }
}

export default App;
