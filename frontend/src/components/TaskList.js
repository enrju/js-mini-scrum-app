import TaskListItem from "./TaskListItem";

function TaskList (props) {
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

export default TaskList;