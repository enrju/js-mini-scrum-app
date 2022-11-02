import { Task, TaskState } from "types";
import {SprintFE} from "../App/App";
import {Button} from "../Button/Button";
import {TaskList} from "../TaskList/TaskList";

interface Props {
    taskList: Task[];
    item: SprintFE;
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

export const SprintListItem = (props: Props) => {
    const todoTaskList = props.taskList.filter((item) => {
        if(item.state === TaskState.TODO) return true;
        else return false;
    });
    const doingTaskList = props.taskList.filter((item) => {
        if(item.state === TaskState.DOING) return true;
        else return false;
    });
    const doneTaskList = props.taskList.filter((item) => {
        if(item.state === TaskState.DONE) return true;
        else return false;
    });

    return (
        <li
            data-id={props.item.id}
            className={props.item.id === props.idChosenSprint ? "active" : ""}
        >
            <header>
                <h2 onClick={props.handleChooseSprint}>{props.item.title}</h2>
                <div>
                    <Button
                        click={props.handleEditSprint}
                        description={"edit"}
                    />
                    <Button
                        click={props.handleDeleteSprint}
                        description={"delete"}
                    />
                    <Button
                        click={props.handleHideShowSprintDetails}
                        description={"less..."}
                    />
                </div>
            </header>
            {props.item.isHide
                ? null
                :   <section>
                    <div className="todo">
                        <h2>TODO</h2>
                        <section>
                            <TaskList
                                taskList={todoTaskList}
                                handleEditTask={props.handleEditTask}
                                handleDeleteTask={props.handleDeleteTask}
                                handleMoveLeftTask={props.handleMoveLeftTask}
                                handleMoveRightTask={props.handleMoveRightTask}
                            />
                        </section>
                    </div>
                    <div className="doing">
                        <h2>DOING</h2>
                        <section>
                            <TaskList
                                taskList={doingTaskList}
                                handleEditTask={props.handleEditTask}
                                handleDeleteTask={props.handleDeleteTask}
                                handleMoveLeftTask={props.handleMoveLeftTask}
                                handleMoveRightTask={props.handleMoveRightTask}
                            />
                        </section>
                    </div>
                    <div className="done">
                        <h2>DONE</h2>
                        <section>
                            <TaskList
                                taskList={doneTaskList}
                                handleEditTask={props.handleEditTask}
                                handleDeleteTask={props.handleDeleteTask}
                                handleMoveLeftTask={props.handleMoveLeftTask}
                                handleMoveRightTask={props.handleMoveRightTask}
                            />
                        </section>
                    </div>
                </section>
            }
        </li>
    )
}