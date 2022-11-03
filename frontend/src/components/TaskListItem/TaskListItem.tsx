import { Task, TaskState } from "types";
import {Button} from "../Button/Button";

interface Props {
    item: Task;
    handleEditTask: any;
    handleDeleteTask: any;
    handleMoveLeftTask: any;
    handleMoveRightTask: any;
}

export const TaskListItem = (props: Props) => {
    return (
        <li data-id={props.item.id}>
            <h2>{props.item.title}</h2>
            <p>{`time: ${props.item.minutes.toFixed(0)}min`}</p>
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
                {props.item.state !== TaskState.BACKLOG
                    ? <Button
                        click={props.handleMoveLeftTask}
                        description={"<"}
                    />
                    : null}
                {props.item.state !== TaskState.DONE
                    ? <Button
                        click={props.handleMoveRightTask}
                        description={">"}
                    />
                    : null}
            </div>
        </li>
    )
}