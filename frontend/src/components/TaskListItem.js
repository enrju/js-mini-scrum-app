import Button from "./Button";

function TaskListItem (props) {
    return (    
        <li data-id={props.item.id}>
            <h2>{props.item.title}</h2>
            <div>
                <Button
                    click={props.handleEditTask}
                    description={"edit"}
                />
                <Button
                    click={props.handleDeleteTask}
                    description={"delete"}
                />
            </div>
            <div>
                {props.item.where_is !== "BACKLOG"
                ? <Button
                    click={props.handleMoveLeftTask}
                    description={"<"}
                />
                : null}
                {props.item.where_is !== "DONE"
                ? <Button
                    click={props.handleMoveRightTask}
                    description={">"}
                />
                : null}
            </div>
        </li> 
    )
}

export default TaskListItem;