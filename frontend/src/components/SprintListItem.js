import Button from "./Button";
import TaskList from './TaskList';

function SprintListItem (props) {
    const todoTaskList = props.taskList.filter((item) => {
        if(item.where_is === "TODO") return true;
        else return false;
    });
    const doingTaskList = props.taskList.filter((item) => {
        if(item.where_is === "DOING") return true;
        else return false;
    });
    const doneTaskList = props.taskList.filter((item) => {
        if(item.where_is === "DONE") return true;
        else return false;
    });
    
    return (
        <li data-id={props.item.id}>
            <header>
                <h2>{props.item.title}</h2>
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

export default SprintListItem;