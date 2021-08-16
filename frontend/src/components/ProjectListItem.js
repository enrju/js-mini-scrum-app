import Button from "./Button";

function ProjectListItem (props) {
    return (    
        <li data-id={props.item.id}>
            <h2>{props.item.title}</h2>
            <p>
                {props.item.isHide ? null : props.item.description}
            </p>
            <Button
                click={props.handleEditProject}
                description={"edit"}
            />
            <Button
                click={props.handleDeleteProject}
                description={"delete"}
            />
            <Button
                click={props.handleHideShowProject}
                description={props.item.isHide ? "more..." : "less..."}
            />
            <Button
                click={props.handleOpenProject}
                description={"open"}
            />
        </li> 
    )
}

export default ProjectListItem;