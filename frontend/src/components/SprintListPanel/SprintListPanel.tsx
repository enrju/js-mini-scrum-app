import {Button} from "../Button/Button";
import {SprintFE} from "../App/App";
import { Task } from "types";
import {SprintList} from "../SprintList/SprintList";

interface Props {
    handleAddSprint: any;
    idChosenSprint: number | null;
    sprintList: SprintFE[];
    taskList: Task[];
    handleChooseSprint: any;
    handleEditSprint: any;
    handleDeleteSprint: any;
    handleHideShowSprintDetails: any;
    handleEditTask: any;
    handleDeleteTask: any;
    handleMoveLeftTask: any;
    handleMoveRightTask: any;
}

export const SprintListPanel = (props: Props) => {
    return(
        <>
            <header>
                <h2>SPRINTS</h2>
                <Button
                    click={props.handleAddSprint}
                    description={"+sprint"}
                />
            </header>
            <section>
                <SprintList
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
            </section>
        </>
    )
}