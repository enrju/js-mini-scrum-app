import Button from "./Button";
import BacklogPanel from "./BacklogPanel";
import SprintListPanel from "./SprintListPanel";

function ProjectPanel(props) {
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

export default ProjectPanel;