import React from 'react';

let projects = [
    {id: 1, title: "project 1", description: "project 1"}
];

let tasks = [
    {id: 1, id_project: 1, id_sprint: null, title: "task 1", where_is: "BACKLOG", minutes: 0},
    {id: 2, id_project: 1, id_sprint: 1, title: "task 2", where_is: "TODO", minutes: 0},
];

let sprints = [
    {id: 1, id_project: 1, title: "sprint - week 1"}
];

class App extends React.Component {
    state = {

    }

    render() {
        return(
            <>
                <p>DZIAŁA !!!</p>
            </>
        )
    }
}

export default App;
