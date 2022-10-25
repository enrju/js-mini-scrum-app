import React, {FormEvent, useEffect, useState} from 'react';
import './App.scss';
import {
    Project,
    Sprint,
    Task,
    GetAllProjectsResponse,
    GetAllSprintsForProjectResponse,
    GetAllTasksForProjectResponse,
    CreateProjectRequest,
    CreateProjectResponse
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

    const setShowFormEditProject = (bool: boolean) => {
        setData((prevData) => {
            return ({
                ...prevData,
                isShowFormEditProject: bool,
            })
        });
    }

    const setEditedProjectIndex = (index: number) => {
        setData((prevData) => {
            return ({
                ...prevData,
                editedProjectIndex: index,
            })
        });
    }

    const setShowFormAddTask = (bool: boolean) => {
        setData((prevData) => {
            return ({
                ...prevData,
                isShowFormAddTask: bool,
            })
        });
    }

    const setShowFormEditTask = (bool: boolean) => {
        setData((prevData) => {
            return ({
                ...prevData,
                isShowFormEditTask: bool,
            })
        });
    }

    const setEditedTaskIndex = (index: number) => {
        setData((prevData) => {
            return ({
                ...prevData,
                editedTaskIndex: index,
            })
        });
    }

    const setShowFormAddSprint = (bool: boolean) => {
        setData((prevData) => {
            return ({
                ...prevData,
                isShowFormAddSprint: bool,
            })
        });
    }

    const setShowFormEditSprint = (bool: boolean) => {
        setData((prevData) => {
            return ({
                ...prevData,
                isShowFormEditSprint: bool,
            })
        });
    }

    const setEditedSprintIndex = (index: number) => {
        setData((prevData) => {
            return ({
                ...prevData,
                editedSprintIndex: index,
            })
        });
    }

    const getDataFromForm = () => {
        const inpTitle: HTMLInputElement | null = document.querySelector("input[name='title']");
        const inpDescription: HTMLInputElement | null = document.querySelector("textarea[name='description']");

        if(inpTitle && inpDescription) {
            const title = inpTitle.value;
            const description = inpDescription ? inpDescription.value : null;

            if(inpDescription) {
                return {
                    title,
                    description
                }
            } else {
                return {
                    title,
                    description: null,
                }
            }
        } else {
            throw new Error('Problem with get data from form - probably form not exist');
        }
    }

    const handleShowFormAddProject = () => {
        setShowFormAddProject(true);
    }

    const handleHideFormAddProject = () => {
        setShowFormAddProject(false);
    }

    const handleAddProject = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: CreateProjectRequest = getDataFromForm();

        const res = await fetch(
            appConfig.apiURL + `/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
        const data: CreateProjectResponse = await res.json();

        if(data.isSuccess) {
            await setProjectList();
        } else {
            console.log(data.msgError);
        }

        setShowFormAddProject(false);
    }

    const handleShowFormEditProject = (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode;
        const id = parent.dataset.id;

        let index = -1;
        for(let i = 0; i < data.projectList.length; i++) {
            if(data.projectList[i].id === Number(id)) {
                index = i;
                break;
            }
        }

        setShowFormEditProject(true);
        setEditedProjectIndex(index);
    }

    return (
        <>
            <h1>Test - cra app</h1>
            <p>{data.projectList.map(item => item.title + ', ')}</p>
        </>
    );
}
