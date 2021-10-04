import React from 'react';

import ProjectListPanel from './ProjectListPanel';
import PopupForm from './PopupForm';
import ProjectPanel from './ProjectPanel';

//-------------- start db ---------------------------------
//move to backend (leave only elements used here)

const ONE_MINUTE_IN_MS = 1000 * 60; //1 minute = 1000ms * 60;

//leave copy it's used in interval
const DELTA_TIME = ONE_MINUTE_IN_MS * 1;

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

//---------- end db ----------------------------------

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

    deltaTime = DELTA_TIME;

    scheme = 'http://';
    host = '127.0.0.1';
    port = 3000;

    componentDidMount() {
        this.setProjectList();
        //MUST BE rendered after update state
        //beacuse this method is call after render()
        this.render();  
    }

    setProjectList() {
        const API = this.scheme + this.host + ':' + this.port + '/api/projects';
        const method = 'GET';

        fetch(API, {
            method: method
        })
        .then(response => response.json())
        .then(result => {
            const newProjects = result;

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
        })
        .catch(err => console.log(err));
    }

    setSprintListOpenedProject(id) {
        const API = this.scheme + this.host + ':' + this.port + `/api/projects/${id}/sprints`;
        const method = 'GET';

        fetch(API, {
            method: method
        })
        .then(response => response.json())
        .then(result => {
            //default chosen first sprint if exist
            const idChosenSprint = result.length > 0 ? result[0].id : null;

            this.setState(() => {
                return ({
                    sprintListOpenedProject: result,
                    idChosenSprint: idChosenSprint,
                })
            });
        })
        .catch(err => console.log(err));
    }

    setTaskListOpenedProject(id) {
        const API = this.scheme + this.host + ':' + this.port + `/api/projects/${id}/tasks`;
        const method = 'GET';

        fetch(API, {
            method: method
        })
        .then(response => response.json())
        .then(result => {
            this.setState(() => {
                return ({
                    taskListOpenedProject: result,
                })
            });
        })
        .catch(err => console.log(err));
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

        const API = this.scheme + this.host + ':' + this.port + '/api/projects';
        const method = 'POST';

        fetch(API, {
            method: method,
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.setProjectList();
        })
        .catch(err => console.log(err));

        this.setShowFormAddProject(false);
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

        const API = this.scheme + this.host + ':' + this.port + `/api/projects/${id}`;
        const method = 'PUT';

        //for PUT
        //can't   - 'no-cors'
        //have to - 'text/plain' 
        fetch(API, {
            method: method,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.setProjectList();
        })
        .catch(err => console.log(err));  
        
        this.setShowFormEditProject(false);
    }

    handleDeleteProject(e) {
        e.preventDefault();

        const parent = e.target.parentNode;
        const id = Number(parent.dataset.id);

        const decision = window.confirm('All tasks and sprints inside project will be deleted!');

        if(decision) {
            const API = this.scheme + this.host + ':' + this.port + `/api/projects/${id}`;
            const method = 'DELETE';

            //for DELETE
            //can't   - 'no-cors'
            //have to - 'text/plain'
            fetch(API, {
                method: method
            })
            .then(() => {
                this.setProjectList();
            })
            .catch(err => console.log(err));
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

        const API = this.scheme + this.host + ':' + this.port + `/api/projects/${id}`;
        const method = 'GET';

        let title = '';
        let description = '';

        fetch(API, {
            method: method
        })
        .then(response => response.json())
        .then(result => {
            title = result.title;
            description = result.description;

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
        })
        .catch(err => console.log(err));
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

        const id = this.state.idOpenedProject;
        const data = this.getDataFromForm();

        const API = this.scheme + this.host + ':' + this.port + `/api/projects/${id}/tasks`;
        const method = 'POST';

        fetch(API, {
            method: method,
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.setTaskListOpenedProject(id);
        })
        .catch(err => console.log(err));

        this.setShowFormAddTask(false);
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

        const API = this.scheme + this.host + ':' + this.port + `/api/tasks/${id}`;
        const method = 'PUT';

        //for PUT
        //can't   - 'no-cors'
        //have to - 'text/plain' 
        fetch(API, {
            method: method,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.setTaskListOpenedProject(this.state.idOpenedProject);
        })
        .catch(err => console.log(err));  
        
        this.setShowFormEditTask(false);
    }

    handleDeleteTask(e) {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        const API = this.scheme + this.host + ':' + this.port + `/api/tasks/${id}`;
        const method = 'DELETE';

        //for DELETE
        //can't   - 'no-cors'
        //have to - 'text/plain'
        fetch(API, {
            method: method
        })
        .then(() => {
            this.setTaskListOpenedProject(this.state.idOpenedProject);
        })
        .catch(err => console.log(err));
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
        const idTask = Number(parent.dataset.id);
        const idChosenSprint = 
        this.state.idChosenSprint !== null 
        ? this.state.idChosenSprint 
        : -1;
        const direction = 'right';

        const API = this.scheme + this.host + ':' + this.port + `/api/sprints/${idChosenSprint}/tasks/${idTask}/${direction}`;
        const method = 'PUT';

        //for PUT
        //can't   - 'no-cors'
        //have to - 'text/plain' 
        fetch(API, {
            method: method,
        })
        .then(() => {
            this.setTaskListOpenedProject(this.state.idOpenedProject);
        })
        .catch(err => console.log(err));
    }

    handleMoveLeftTask(e) {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const idTask = Number(parent.dataset.id);
        const idChosenSprint = 
        this.state.idChosenSprint !== null 
        ? this.state.idChosenSprint 
        : -1;
        const direction = 'left';

        const API = this.scheme + this.host + ':' + this.port + `/api/sprints/${idChosenSprint}/tasks/${idTask}/${direction}`;
        const method = 'PUT';

        //for PUT
        //can't   - 'no-cors'
        //have to - 'text/plain' 
        fetch(API, {
            method: method,
        })
        .then(() => {
            this.setTaskListOpenedProject(this.state.idOpenedProject);
        })
        .catch(err => console.log(err));
    }

    handleShowFormAddSprint() {
        this.setShowFormAddSprint(true);
    }

    handleHideFormAddSprint() {
        this.setShowFormAddSprint(false);
    }

    handleAddSprint(e) {
        e.preventDefault();

        const idOpenedProject = this.state.idOpenedProject;
        const data = this.getDataFromForm();

        const API = this.scheme + this.host + ':' + this.port + `/api/projects/${idOpenedProject}/sprints`;
        const method = 'POST';

        fetch(API, {
            method: method,
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.setSprintListOpenedProject(idOpenedProject);
        })
        .catch(err => console.log(err));

        this.setShowFormAddSprint(false);
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

        const API = this.scheme + this.host + ':' + this.port + `/api/sprints/${id}`;
        const method = 'PUT';

        //for PUT
        //can't   - 'no-cors'
        //have to - 'text/plain' 
        fetch(API, {
            method: method,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            this.setSprintListOpenedProject(this.state.idOpenedProject);
        })
        .catch(err => console.log(err));  
        
        this.setShowFormEditSprint(false);
    }

    handleDeleteSprint(e) {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        const decision = window.confirm('All tasks inside sprint will be deleted!');

        if(decision) {
            const API = this.scheme + this.host + ':' + this.port + `/api/sprints/${id}`;
            const method = 'DELETE';

            //for DELETE
            //can't   - 'no-cors'
            //have to - 'text/plain'
            fetch(API, {
                method: method
            })
            .then(() => {
                this.setSprintListOpenedProject(this.state.idOpenedProject);
            })
            .catch(err => console.log(err));    
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
        const idActiveProject = this.state.idOpenedProject;

        const API = this.scheme + this.host + ':' + this.port + `/api/tasks/time`;
        const method = 'PUT';

        //for PUT
        //can't   - 'no-cors'
        //have to - 'text/plain' 
        fetch(API, {
            method: method,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(idActiveProject)
        })
        .then(() => {
            this.setTaskListOpenedProject(this.state.idOpenedProject);
        })
        .catch(err => console.log(err));
    }

    render() {
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
