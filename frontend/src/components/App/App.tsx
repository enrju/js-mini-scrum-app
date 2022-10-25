import React, {useEffect, useState} from 'react';
import './App.scss';
import {
    Project,
    Sprint,
    Task,
    GetAllProjectsResponse,
    GetAllSprintsForProjectResponse,
    GetAllTasksForProjectResponse
} from 'types';
import {appConfig} from "../../config/app-config";

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
    const [data, setData] = useState<AppData>({
        idOpenedProject: null,
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
        projectList: [],
        editedProjectIndex: -1,
        isShowFormAddProject: false,
        isShowFormEditProject: false,
    });

    const [interval, setInterval] = useState(null);

    useEffect(() => {
        (async () => {
            await setProjectList();
        })();
    }, []);

    const setProjectList = async () => {
        const res = await fetch(
            appConfig.apiURL + '/projects', {
            method: 'GET'
        });
        const data: GetAllProjectsResponse = await res.json();

        if(data.isSuccess) {
            setData({
                idOpenedProject: null,
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
                projectList: data.data,
                editedProjectIndex: -1,
                isShowFormAddProject: false,
                isShowFormEditProject: false,
            });
        } else {
            console.log(data.msgError);
        }
    }

    const setSprintListOpenedProject = async (id: number) => {
        const res = await fetch(
            appConfig.apiURL + `/projects/${id}/sprints`, {
                method: 'GET'
            });
        const data: GetAllSprintsForProjectResponse = await res.json();

        if(data.isSuccess) {
            setData((prevData) => {
                return ({
                    ...prevData,
                    sprintListOpenedProject: data.data,
                    idChosenSprint: data.data.length > 0 && data.data[0].id ? data.data[0].id : null,
                })
            });
        } else {
            console.log(data.msgError);
        }
    }

    const setTaskListOpenedProject = async (id: number) => {
        const res = await fetch(
            appConfig.apiURL + `/projects/${id}/tasks`, {
                method: 'GET'
            });
        const data: GetAllTasksForProjectResponse = await res.json();

        if(data.isSuccess) {
            setData((prevData) => {
                return ({
                    ...prevData,
                    taskListOpenedProject: data.data,
                })
            });
        } else {
            console.log(data.msgError);
        }
    }

    const setShowFormAddProject = (bool: boolean) => {
        setData((prevData) => {
            return ({
                ...prevData,
                isShowFormAddProject: bool,
            })
        });
    }

    return (
        <>
            <h1>Test - cra app</h1>
            <p>{data.projectList.map(item => item.title + ', ')}</p>
        </>
);
}
