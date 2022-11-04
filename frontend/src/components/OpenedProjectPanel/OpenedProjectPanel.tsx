import { Task } from "types";
import {Button} from "../Button/Button";
import {SprintFE} from "../App/App";
import {BacklogPanel} from "../BacklogPanel/BacklogPanel";
import {SprintListPanel} from "../SprintListPanel/SprintListPanel";

interface Props {
    title: string;
    description: string;
    handleCloseProject: any;
    handleAddTask: any;
    isBacklogHide: boolean;
    handleHideShowBacklogDetails: any;
    taskList: Task[];
    handleEditTask: any;
    handleDeleteTask: any;
    handleMoveLeftTask: any;
    handleMoveRightTask: any;
    handleAddSprint: any;
    idChosenSprint: number | null;
    sprintList: SprintFE[];
    handleChooseSprint: any;
    handleEditSprint: any;
    handleDeleteSprint: any;
    handleHideShowSprintDetails: any;
}

export const OpenedProjectPanel = (props: Props) => {
    return(
        <>
            <header>
                <h1>PROJECT</h1>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                <Button
                    click={props.handleCloseProject}
                    description={"close"}
                />
            </header>
            <section>
                <div className="backlog">
                    <BacklogPanel
                        handleAddTask={props.handleAddTask}
                        isBacklogHide={props.isBacklogHide}
                        handleHideShowBacklogDetails={props.handleHideShowBacklogDetails}
                        taskList={props.taskList}
                        handleEditTask={props.handleEditTask}
                        handleDeleteTask={props.handleDeleteTask}
                        handleMoveLeftTask={props.handleMoveLeftTask}
                        handleMoveRightTask={props.handleMoveRightTask}
                    />
                </div>
                <div className="sprints">
                    <SprintListPanel
                        handleAddSprint={props.handleAddSprint}
                        idChosenSprint={props.idChosenSprint}
                        sprintList={props.sprintList}
                        taskList={props.taskList}
                        handleChooseSprint={props.handleChooseSprint}
                        handleEditSprint={props.handleEditSprint}
                        handleDeleteSprint={props.handleDeleteSprint}
                        handleHideShowSprintDetails={props.handleHideShowSprintDetails}
                        handleEditTask={props.handleEditTask}
                        handleDeleteTask={props.handleDeleteTask}
                        handleMoveLeftTask={props.handleMoveLeftTask}
                        handleMoveRightTask={props.handleMoveRightTask}
                    />
                </div>
            </section>
        </>
    )
}