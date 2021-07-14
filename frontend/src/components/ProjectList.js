import ProjectListItem from "./ProjectListItem";

function ProjectList (props) {
    return (
        <ul>
            {props.projectList.map((item) => {
                return(
                    <ProjectListItem
                        key={item.id}
                        item={item}
                        handleEditProject={props.handleEditProject}
                        handleDeleteProject={props.handleDeleteProject}
                        handleHideShowProject={props.handleHideShowProject}
                    />
                )
            })}
        </ul>
    )
}

export default ProjectList;