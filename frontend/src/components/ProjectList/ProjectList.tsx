import {ProjectFE} from "../App/App";
import {ProjectListItem} from "../ProjectListItem/ProjectListItem";

interface Props {
    projectList: ProjectFE[];
    handleEditProject: any;
    handleDeleteProject: any;
    handleHideShowProject: any;
    handleOpenProject: any;
}

export const ProjectList = (props: Props) => {
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
                        handleOpenProject={props.handleOpenProject}
                    />
                )
            })}
        </ul>
    )
}