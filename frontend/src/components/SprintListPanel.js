import Button from "./Button";
import SprintList from "./SprintList";

function SprintListPanel(props) {
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

export default SprintListPanel;