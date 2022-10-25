import React, {useState} from 'react';
import './App.scss';
import {Project, Sprint, Task} from 'types';

interface AppData {
    idOpenedProject: number | null;
    titleOpenedProject: string;
    descriptionOpenedProject: string;
    taskListOpenedProject: Task[];
    sprintListOpenedProject: Sprint[];
    isBacklogHide: boolean;
    idChosenSprint: number | null;
    editedTaskIndex: number;
    isShowFormAddTask: boolean;
    isShowFormEditTask: boolean;
    editedSprintIndex: number;
    isShowFormAddSprint: boolean;
    isShowFormEditSprint: boolean;
    projectList: Project[];
    editedProjectIndex: number;
    isShowFormAddProject: boolean;
    isShowFormEditProject: boolean;
}

export const App = () => {

    return (
        <h1>Test - cra app</h1>
    );
}
