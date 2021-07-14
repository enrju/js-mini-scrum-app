import React from 'react';

import ProjectListPanel from './ProjectListPanel';

let projects = [
    {id: 1, title: "project 1", description: "project 1"},
];

let tasks = [
    {id: 1, id_project: 1, id_sprint: null, title: "task 1", where_is: "BACKLOG", minutes: 0},
    {id: 2, id_project: 1, id_sprint: 1, title: "task 2", where_is: "TODO", minutes: 0},
];

let sprints = [
    {id: 1, id_project: 1, title: "sprint - week 1"},
];

class App extends React.Component {
    // pobranie danych musi być przed zmontowaniem
    // componentWillMount() został zdeprecjonowany
    // więc inicjalizację state przeniesiono do 
    // konstruktora
    constructor() {
        super();
        let newProjects = projects.map((item) => {
            let newItem = item;
            newItem.isHide = true;
            return newItem;
        });

        //tmp using variable to fix warnings
        tasks.map(() => {return true});
        sprints.map(() => {return true});
        //----------------------------------

        this.state = {
            idChosenProject: null,
            projectList: newProjects
        }
    }

    render() {
        if(this.state.idChosenProject === null) {
            return (
                <ProjectListPanel
                    projectList={this.state.projectList}
                />
            )
        } else {
            return null;
        }
        
    }
}

export default App;
