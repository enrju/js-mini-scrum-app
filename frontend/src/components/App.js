import React from 'react';

import ProjectListPanel from './ProjectListPanel';
import PopupForm from './PopupForm';

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

class App extends React.Component {
    state = {
        idChosenProject: null,
        projectList: [],
        isShowFormAddProject: false
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
            if(index % 2) {
                newItem.isHide = false;
            } else {
                newItem.isHide = true;
            }
            return newItem;
        });

        //tmp using variable to fix warnings
        tasks.map(() => {return true});
        sprints.map(() => {return true});
        //----------------------------------
    
        this.setState({
            idChosenProject: null,
            projectList: newProjects
        });
    }

    setShowFormAddProject(what) {
        this.setState(() => {
            return ({
                isShowFormAddProject: what
            })
        });
    }

    render() {
        if(this.state.idChosenProject === null) {
            return (
                <>
                    <ProjectListPanel
                        projectList={this.state.projectList}
                        handleAddProject={this.setShowFormAddProject.bind(this, true)}
                        handleEditProject={null}
                        handleDeleteProject={null}
                        handleHideShowProject={null}
                    />
                    {this.state.isShowFormAddProject ?
                        <PopupForm
                            name = "new project"
                            isDescription={true}
                            handleCancelAddBtn={this.setShowFormAddProject.bind(this, false)}
                            handleAddBtn={e => {
                                e.preventDefault();
                                console.log('add');
                            }} //tutaj handleAddProject
                        />
                        : null
                    }
                </>
            )
        } else {
            return null;
        }
        
    }
}

export default App;
