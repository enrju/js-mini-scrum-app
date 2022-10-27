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
    CreateProjectResponse,
    UpdateProjectRequest,
    UpdateProjectResponse,
    DeleteProjectResponse,
    GetOneProjectResponse,
    taskConfig,
    CreateTaskForProjectRequest,
    UpdateTaskRequest,
    UpdateTaskResponse,
    DeleteTaskResponse,
    UpdateTaskStateForSprintResponse,
    CreateSprintForProjectRequest,
    CreateSprintForProjectResponse,
    CreateTaskForProjectResponse
} from 'types';
import {appConfig} from "../../config/app-config";

interface ProjectFE extends Project {
    isHide: boolean;
}

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
    projectList: ProjectFE[];
    editedProjectIndex: number;
    isShowFormAddProject: boolean;
    isShowFormEditProject: boolean;
}

export const App = () => {
    const [appData, setAppData] = useState<AppData>({
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

    const [appInterval, setAppInterval] = useState<NodeJS.Timer>();

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
            const projectListFE = data.data.map(item => ({
                ...item,
                isHide: false,
            } as ProjectFE));

            setAppData({
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
                projectList: projectListFE,
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
            setAppData((prevData) => {
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
            setAppData((prevData) => {
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
        setAppData((prevData) => {
            return ({
                ...prevData,
                isShowFormAddProject: bool,
            })
        });
    }

    const setShowFormEditProject = (bool: boolean) => {
        setAppData((prevData) => {
            return ({
                ...prevData,
                isShowFormEditProject: bool,
            })
        });
    }

    const setEditedProjectIndex = (index: number) => {
        setAppData((prevData) => {
            return ({
                ...prevData,
                editedProjectIndex: index,
            })
        });
    }

    const setShowFormAddTask = (bool: boolean) => {
        setAppData((prevData) => {
            return ({
                ...prevData,
                isShowFormAddTask: bool,
            })
        });
    }

    const setShowFormEditTask = (bool: boolean) => {
        setAppData((prevData) => {
            return ({
                ...prevData,
                isShowFormEditTask: bool,
            })
        });
    }

    const setEditedTaskIndex = (index: number) => {
        setAppData((prevData) => {
            return ({
                ...prevData,
                editedTaskIndex: index,
            })
        });
    }

    const setShowFormAddSprint = (bool: boolean) => {
        setAppData((prevData) => {
            return ({
                ...prevData,
                isShowFormAddSprint: bool,
            })
        });
    }

    const setShowFormEditSprint = (bool: boolean) => {
        setAppData((prevData) => {
            return ({
                ...prevData,
                isShowFormEditSprint: bool,
            })
        });
    }

    const setEditedSprintIndex = (index: number) => {
        setAppData((prevData) => {
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
        for(let i = 0; i < appData.projectList.length; i++) {
            if(appData.projectList[i].id === Number(id)) {
                index = i;
                break;
            }
        }

        setShowFormEditProject(true);
        setEditedProjectIndex(index);
    }

    const handleHideFormEditProject = () => {
        setShowFormEditProject(false);
    }

    const handleEditProject = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const index = appData.editedProjectIndex;
        const id = appData.projectList[index].id;
        setEditedProjectIndex(-1);

        const formData: UpdateProjectRequest = getDataFromForm();

        const res = await fetch(
            appConfig.apiURL + `/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
        const data: UpdateProjectResponse = await res.json();

        if(data.isSuccess) {
            await setProjectList();
        } else {
            console.log(data.msgError);
        }

        setShowFormEditProject(false);
    }

    const handleDeleteProject = async (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode;
        const id = Number(parent.dataset.id);

        const decision = window.confirm('All tasks and sprints inside project will be deleted!');

        if(decision) {
            const res = await fetch(
                appConfig.apiURL + `/projects/${id}`, {
                    method: 'DELETE',
                });
            const data: DeleteProjectResponse = await res.json();

            if(data.isSuccess) {
                await setProjectList();
            } else {
                console.log(data.msgError);
            }
        }
    }

    const handleHideShowProjectDescription = (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode;
        const id = parent.dataset.id;

        //copy of table
        let newProjectList = [ ...appData.projectList ].map(item => {
            if(item.id === id) {
                return {
                    ...item,
                    isHide: !item.isHide,
                }
            } else {
                return {
                    ...item,
                }
            }
        });

        setAppData((prevData) => {
            return ({
                ...prevData,
                projectList: newProjectList,
            })
        });

        //don't get projects from DB
        //because changes are only in state from App
    }

    const handleOpenProject = async (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode;
        const id = Number(parent.dataset.id);

        let title = '';
        let description = '';

        const res = await fetch(
            appConfig.apiURL + `/projects/${id}`, {
                method: 'GET',
            });
        const data: GetOneProjectResponse = await res.json();

        if(data.isSuccess) {
            title = data.data.title;
            description = data.data.description ? data.data.description : '';

            //set state.sprintListOpenedProject - setState() inside
            await setSprintListOpenedProject(id);

            //set state.taskListOpenedProject - setState() inside
            await setTaskListOpenedProject(id);

            const interval = setInterval(handleUpdateTaskTime, taskConfig.DELTA_TIME_IN_MS);

            setAppInterval(interval);

            setAppData((prevData) => {
                return ({
                    ...prevData,
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

        } else {
            console.log(data.msgError);
        }
    }

    const handleCloseProject = async () => {
        clearInterval(appInterval);
        await setProjectList();
    }

    const handleShowFormAddTask = () => {
        setShowFormAddTask(true);
    }

    const handleHideFormAddTask = () => {
        setShowFormAddTask(false);
    }

    const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const id = appData.idOpenedProject;
        const formData: CreateTaskForProjectRequest = getDataFromForm();

        const res = await fetch(
            appConfig.apiURL + `/projects/${id}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
        const data: CreateTaskForProjectResponse = await res.json();

        if(data.isSuccess) {
            if(id) {
                await setTaskListOpenedProject(id);
            }
        } else {
            console.log(data.msgError);
        }

        setShowFormAddTask(false);
    }

    const handleHideShowBacklogDetails = () => {
        setAppData((prevData) => {
            return ({
                ...prevData,
                isBacklogHide: !prevData.isBacklogHide,
            })
        });
    }

    const handleShowFormEditTask = (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        let index = -1;
        for(let i = 0; i < appData.taskListOpenedProject.length; i++) {
            if(appData.taskListOpenedProject[i].id === Number(id)) {
                index = i;
                break;
            }
        }

        setShowFormEditTask(true);
        setEditedTaskIndex(index);
    }

    const handleHideFormEditTask = () => {
        setShowFormEditTask(false);
    }

    const handleEditTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const index = appData.editedTaskIndex;
        const id = appData.taskListOpenedProject[index].id;
        setEditedTaskIndex(-1);

        const formData: UpdateTaskRequest = getDataFromForm();

        const res = await fetch(
            appConfig.apiURL + `/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
        const data: UpdateTaskResponse = await res.json();

        if(data.isSuccess) {
            if(appData.idOpenedProject) {
                await setTaskListOpenedProject(appData.idOpenedProject);
            }
        } else {
            console.log(data.msgError);
        }

        setShowFormEditTask(false);
    }

    const handleDeleteTask = async (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        const res = await fetch(
            appConfig.apiURL + `/tasks/${id}`, {
                method: 'DELETE',
            });
        const data: DeleteTaskResponse = await res.json();

        if(data.isSuccess) {
            if(appData.idOpenedProject) {
                await setTaskListOpenedProject(appData.idOpenedProject);
            }
        } else {
            console.log(data.msgError);
        }
    }

    const handleChooseSprint = (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        setAppData((prevData) => {
            return ({
                ...prevData,
                idChosenSprint: id,
            })
        });
    }

    const handleMoveRightTask = async (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const idTask = Number(parent.dataset.id);
        const idChosenSprint =
            appData.idChosenSprint !== null
                ? appData.idChosenSprint
                : -1;
        const direction = 'right';

        const res = await fetch(
            appConfig.apiURL + `/sprints/${idChosenSprint}/tasks/${idTask}/${direction}`, {
                method: 'PUT',
            });
        const data: UpdateTaskStateForSprintResponse = await res.json();

        if(data.isSuccess) {
            if(appData.idOpenedProject) {
                await setTaskListOpenedProject(appData.idOpenedProject);
            }
        } else {
            console.log(data.msgError);
        }
    }

    const handleMoveLeftTask = async (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode;
        const idTask = Number(parent.dataset.id);
        const idChosenSprint =
            appData.idChosenSprint !== null
                ? appData.idChosenSprint
                : -1;
        const direction = 'left';

        const res = await fetch(
            appConfig.apiURL + `/sprints/${idChosenSprint}/tasks/${idTask}/${direction}`, {
                method: 'PUT',
            });
        const data: UpdateTaskStateForSprintResponse = await res.json();

        if(data.isSuccess) {
            if(appData.idOpenedProject) {
                await setTaskListOpenedProject(appData.idOpenedProject);
            }
        } else {
            console.log(data.msgError);
        }
    }

    const handleShowFormAddSprint = () => {
        setShowFormAddSprint(true);
    }

    const handleHideFormAddSprint = () => {
        setShowFormAddSprint(false);
    }

    const handleAddSprint = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const idOpenedProject = appData.idOpenedProject;
        const formData: CreateSprintForProjectRequest = getDataFromForm();

        const res = await fetch(
            appConfig.apiURL + `/projects/${idOpenedProject}/sprints`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
        const data: CreateSprintForProjectResponse = await res.json();

        if(data.isSuccess) {
            if(idOpenedProject) {
                await setSprintListOpenedProject(idOpenedProject);
            }
        } else {
            console.log(data.msgError);
        }

        setShowFormAddSprint(false);
    }

    //---------------

    const handleUpdateTaskTime = () => {}

    //linia 618

    return (
        <>
            <h1>Test - cra app</h1>
            <p>{appData.projectList.map(item => item.title + ', ')}</p>
        </>
    );
}
