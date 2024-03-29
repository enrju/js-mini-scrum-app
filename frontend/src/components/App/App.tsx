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
    CreateTaskForProjectResponse,
    UpdateSprintResponse,
    UpdateSprintRequest,
    DeleteSprintResponse,
    UpdateTasksTimeForProjectResponse
} from 'types';
import {appConfig} from "../../config/app-config";
import {ProjectListPanel} from "../ProjectListPanel/ProjectListPanel";
import {PopupForm} from "../PopupForm/PopupForm";
import {OpenedProjectPanel} from "../OpenedProjectPanel/OpenedProjectPanel";

export interface ProjectFE extends Project {
    isHide: boolean;
}

export interface SprintFE extends Sprint {
    isHide: boolean;
}

interface AppData {
    idOpenedProject: number | null;
    titleOpenedProject: string;
    descriptionOpenedProject: string;
    taskListOpenedProject: Task[];
    sprintListOpenedProject: SprintFE[];
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
            const sprintListFE = data.data.map(item => ({
                ...item,
                isHide: false,
            } as SprintFE));

            setAppData((prevData) => {
                return ({
                    ...prevData,
                    sprintListOpenedProject: sprintListFE,
                    idChosenSprint: sprintListFE.length > 0 && sprintListFE[0].id ? sprintListFE[0].id : null,
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
            // const description = inpDescription ? inpDescription.value : null;
            const description = inpDescription.value;

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
        } else if(inpTitle && !inpDescription) {
            const title = inpTitle.value;

            return {
                title,
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

    const handleAddProject = async (e: any) => {
        e.preventDefault();

        const formData: any = getDataFromForm();

        const requestData: CreateProjectRequest = {
            title: formData.title,
            description: formData.description,
        }

        if(requestData.description === '') {
            requestData.description = null;
        }

        const res = await fetch(
            appConfig.apiURL + `/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
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

    const handleEditProject = async (e: any) => {
        e.preventDefault();

        const index = appData.editedProjectIndex;
        const id = appData.projectList[index].id;

        const formData: any = getDataFromForm();

        const requestData: UpdateProjectRequest = {
            title: formData.title,
            description: formData.description,
        }

        if(requestData.description === '') {
            requestData.description = null;
        }

        const res = await fetch(
            appConfig.apiURL + `/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
            });
        const data: UpdateProjectResponse = await res.json();

        if(data.isSuccess) {
            await setProjectList();
        } else {
            console.log(data.msgError);
        }

        setShowFormEditProject(false);
        setEditedProjectIndex(-1);
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
        const id = Number(parent.dataset.id);

        setAppData((prevData) => {
            //copy of table
            let newProjectList = [ ...prevData.projectList ].map(item => {
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

            const interval = setInterval(() => {handleUpdateTaskTimeForProject(id)}, taskConfig.DELTA_TIME_IN_MS);

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

    const handleAddTask = async (e: any) => {
        e.preventDefault();

        const id = appData.idOpenedProject;
        const formData: any = getDataFromForm();

        const requestData: CreateTaskForProjectRequest = {
            title: formData.title,
            description: '',
        }

        if(requestData.description === '') {
            requestData.description = null;
        }

        const res = await fetch(
            appConfig.apiURL + `/projects/${id}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
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

    const handleEditTask = async (e: any) => {
        e.preventDefault();

        const index = appData.editedTaskIndex;
        const id = appData.taskListOpenedProject[index].id;

        const formData: any = getDataFromForm();

        const requestData: UpdateTaskRequest = {
            title: formData.title,
            description: '',
        }

        if(requestData.description === '') {
            requestData.description = null;
        }

        const res = await fetch(
            appConfig.apiURL + `/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
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
        setEditedTaskIndex(-1);
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

    const handleAddSprint = async (e: any) => {
        e.preventDefault();

        const idOpenedProject = appData.idOpenedProject;
        const formData: any = getDataFromForm();

        const requestData: CreateSprintForProjectRequest = {
            title: formData.title,
        }

        const res = await fetch(
            appConfig.apiURL + `/projects/${idOpenedProject}/sprints`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
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

    const handleShowFormEditSprint = (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        let index = -1;
        for(let i = 0; i < appData.sprintListOpenedProject.length; i++) {
            if(appData.sprintListOpenedProject[i].id === Number(id)) {
                index = i;
                break;
            }
        }

        setShowFormEditSprint(true);
        setEditedSprintIndex(index);
    }

    const handleHideFormEditSprint = () => {
        setShowFormEditSprint(false);
    }

    const handleEditSprint = async (e: any) => {
        e.preventDefault();

        const index = appData.editedSprintIndex;
        const id = appData.sprintListOpenedProject[index].id;

        const formData: any = getDataFromForm();

        const requestData: UpdateSprintRequest = {
            title: formData.title,
        }

        const res = await fetch(
            appConfig.apiURL + `/sprints/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
            });
        const data: UpdateSprintResponse = await res.json();

        if(data.isSuccess) {
            if(appData.idOpenedProject) {
                await setSprintListOpenedProject(appData.idOpenedProject);
            }
        } else {
            console.log(data.msgError);
        }

        setShowFormEditSprint(false);
        setEditedSprintIndex(-1);
    }

    const handleDeleteSprint = async (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        const decision = window.confirm('All tasks inside sprint will be deleted!');

        if(decision) {
            const res = await fetch(
                appConfig.apiURL + `/sprints/${id}`, {
                    method: 'DELETE',
                });
            const data: DeleteSprintResponse = await res.json();

            if(data.isSuccess) {
                if(appData.idOpenedProject) {
                    await setSprintListOpenedProject(appData.idOpenedProject);
                }
            } else {
                console.log(data.msgError);
            }
        }
    }

    const handleHideShowSprintDetails = (e: any) => {
        e.preventDefault();

        const parent = e.target.parentNode.parentNode.parentNode;
        const id = Number(parent.dataset.id);

        //copy of table
        let newSprintList = [ ...appData.sprintListOpenedProject ].map(item => {
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
                sprintListOpenedProject: newSprintList,
            })
        });
    }

    const handleUpdateTaskTimeForProject = async (projectId: number) => {
        const res = await fetch(
            appConfig.apiURL + `/projects/${projectId}/tasks/time`, {
                method: 'PUT',
            });
        const data: UpdateTasksTimeForProjectResponse = await res.json();

        if(data.isSuccess) {
            await setTaskListOpenedProject(projectId);
        } else {
            console.log(data.msgError);
        }
    }

    if(appData.idOpenedProject === null) {
        return (
            <main>
                <ProjectListPanel
                    projectList={appData.projectList}
                    handleAddProject={handleShowFormAddProject}
                    handleEditProject={handleShowFormEditProject}
                    handleDeleteProject={handleDeleteProject}
                    handleHideShowProject={handleHideShowProjectDescription}
                    handleOpenProject={handleOpenProject}
                />
                {appData.isShowFormAddProject ?
                    <PopupForm
                        handleSubmitForm={handleAddProject}
                        name = "new project"
                        isDescription={true}
                        title=""
                        description=""
                        handleCancelAddBtn={handleHideFormAddProject}
                        handleAddBtn={null}
                    />
                    : null
                }
                {appData.isShowFormEditProject ?
                    <PopupForm
                        handleSubmitForm={handleEditProject}
                        name = "edit project"
                        isDescription={true}
                        title={appData.projectList[appData.editedProjectIndex].title}
                        description={appData.projectList[appData.editedProjectIndex].description}
                        handleCancelAddBtn={handleHideFormEditProject}
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
                <OpenedProjectPanel
                    title={appData.titleOpenedProject}
                    description={appData.descriptionOpenedProject}
                    handleCloseProject={handleCloseProject}
                    handleAddTask={handleShowFormAddTask}
                    isBacklogHide={appData.isBacklogHide}
                    handleHideShowBacklogDetails={handleHideShowBacklogDetails}
                    handleAddSprint={handleShowFormAddSprint}
                    idChosenSprint={appData.idChosenSprint}
                    sprintList={appData.sprintListOpenedProject}
                    taskList={appData.taskListOpenedProject}
                    handleChooseSprint={handleChooseSprint}
                    handleEditSprint={handleShowFormEditSprint}
                    handleDeleteSprint={handleDeleteSprint}
                    handleHideShowSprintDetails={handleHideShowSprintDetails}
                    handleEditTask={handleShowFormEditTask}
                    handleDeleteTask={handleDeleteTask}
                    handleMoveLeftTask={handleMoveLeftTask}
                    handleMoveRightTask={handleMoveRightTask}
                />
                {appData.isShowFormAddTask ?
                    <PopupForm
                        handleSubmitForm={handleAddTask}
                        name = "new task"
                        isDescription={false}
                        title=""
                        description=""
                        handleCancelAddBtn={handleHideFormAddTask}
                        handleAddBtn={null}
                    />
                    : null
                }
                {appData.isShowFormEditTask ?
                    <PopupForm
                        handleSubmitForm={handleEditTask}
                        name = "edit task"
                        isDescription={false}
                        title={appData.taskListOpenedProject[appData.editedTaskIndex].title}
                        description=""
                        handleCancelAddBtn={handleHideFormEditTask}
                        handleAddBtn={null}
                    />
                    : null
                }
                {appData.isShowFormAddSprint ?
                    <PopupForm
                        handleSubmitForm={handleAddSprint}
                        name = "new sprint"
                        isDescription={false}
                        title=""
                        description=""
                        handleCancelAddBtn={handleHideFormAddSprint}
                        handleAddBtn={null}
                    />
                    : null
                }
                {appData.isShowFormEditSprint ?
                    <PopupForm
                        handleSubmitForm={handleEditSprint}
                        name = "edit sprint"
                        isDescription={false}
                        title={appData.sprintListOpenedProject[appData.editedSprintIndex].title}
                        description=""
                        handleCancelAddBtn={handleHideFormEditSprint}
                        handleAddBtn={null}
                    />
                    : null
                }
            </main>
        )
    }
}