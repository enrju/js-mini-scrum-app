import Button from "./Button";
import TaskList from "./TaskList";

function BacklogPanel(props) {
    const backlogTaskList = props.taskList.filter((item) => {
        if(item.where_is === "BACKLOG") return true;
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
                    description={"less..."}
                />
            </header>
            <section>
                <TaskList
                    taskList={backlogTaskList}
                    handleEditTask={props.handleEditTask}
                    handleDeleteTask={props.handleDeleteTask}
                    handleMoveLeftTask={props.handleMoveLeftTask}
                    handleMoveRightTask={props.handleMoveRightTask}
                />
            </section>
        </>
    )
}

export default BacklogPanel;