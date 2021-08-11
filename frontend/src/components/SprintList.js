import SprintListItem from "./SprintListItem";

function SprintList (props) {
    return (
        <ul>
            {props.sprintList.map((item) => {
                const thisSprintTaskList = props.taskList.filter((task) => {
                    if(task.id_sprint === item.id) return true;
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

export default SprintList;