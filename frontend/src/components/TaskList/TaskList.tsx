import { Task } from "types";
import {TaskListItem} from "../TaskListItem/TaskListItem";

interface Props {
    taskList: Task[];
    handleEditTask: any;
    handleDeleteTask: any;
    handleMoveLeftTask: any;
    handleMoveRightTask: any;
}

export const TaskList = (props: Props) => {
    return (
        <ul>
            {props.taskList.map((item) => {
                return(
                    <TaskListItem
                        key={item.id}
                        item={item}
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