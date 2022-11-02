import { Task } from "types";
import {SprintFE} from "../App/App";
import {SprintListItem} from "../SprintListItem/SprintListItem";

interface Props {
    sprintList: SprintFE[];
    taskList: Task[];
    idChosenSprint: number;
    handleChooseSprint: any;
    handleEditSprint: any;
    handleDeleteSprint: any;
    handleHideShowSprintDetails: any;
    handleEditTask: any;
    handleDeleteTask: any;
    handleMoveLeftTask: any;
    handleMoveRightTask: any;
}

export const SprintList = (props: Props) => {
    return (
        <ul>
            {props.sprintList.map((item) => {
                const thisSprintTaskList = props.taskList.filter((task) => {
                    if(task.sprint_id === item.id) return true;
                    else return false;
                })
                return(
                    <SprintListItem
                        key={item.id}
                        item={item}
                        idChosenSprint={props.idChosenSprint}
                        taskList={thisSprintTaskList}
                        handleChooseSprint={props.handleChooseSprint}
                        handleEditSprint={props.handleEditSprint}
                        handleDeleteSprint={props.handleDeleteSprint}
                        handleHideShowSprintDetails={props.handleHideShowSprintDetails}
                        handleEditTask={props.handleEditTask}
                        handleDeleteTask={props.handleDeleteTask}
                        handleMoveLeftTask={props.handleMoveLeftTask}
                        handleMoveRightTask={props.handleMoveRightTask}
                    />
                )
            })}
        </ul>
    )
}