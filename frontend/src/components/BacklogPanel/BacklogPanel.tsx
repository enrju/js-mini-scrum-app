import { Task, TaskState } from "types";
import {Button} from "../Button/Button";
import {TaskList} from "../TaskList/TaskList";

interface Props {
    taskList: Task[];
    handleAddTask: any;
    handleHideShowBacklogDetails: any;
    isBacklogHide: boolean;
    handleEditTask: any;
    handleDeleteTask: any;
    handleMoveLeftTask: any;
    handleMoveRightTask: any;
}

export const BacklogPanel = (props: Props) => {
    const backlogTaskList = props.taskList.filter((item) => {
        if(item.state === TaskState[TaskState.BACKLOG] as unknown) return true;
        else return false;
    });

    return(
        <>
            <header>
                <h2>BACKLOG</h2>
                <Button
                    click={props.handleAddTask}
                    description={"+task"}
                />
                <Button
                    click={props.handleHideShowBacklogDetails}
                    description={props.isBacklogHide
                        ? "more..."
                        : "less..."}
                />
            </header>
            <section>
                {props.isBacklogHide
                    ? null
                    : <TaskList
                        taskList={backlogTaskList}
                        handleEditTask={props.handleEditTask}
                        handleDeleteTask={props.handleDeleteTask}
                        handleMoveLeftTask={props.handleMoveLeftTask}
                        handleMoveRightTask={props.handleMoveRightTask}
                    />}
            </section>
        </>
    )
}
