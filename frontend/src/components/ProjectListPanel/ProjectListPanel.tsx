import {ProjectFE} from "../App/App";
import {Button} from "../Button/Button";
import {ProjectList} from "../ProjectList/ProjectList";

interface Props {
    // handleAddProject: Function;
    handleAddProject: any;
    projectList: ProjectFE[];
    handleEditProject: any;
    handleDeleteProject: any;
    handleHideShowProject: any;
    handleOpenProject: any;
}

export const ProjectListPanel = (props: Props) => {
    return (
        <>
            <h1>PROJECTS</h1>
            <Button
                click={props.handleAddProject}
                description={"+ project"}
            />
            <ProjectList
                projectList={props.projectList}
                handleEditProject={props.handleEditProject}
                handleDeleteProject={props.handleDeleteProject}
                handleHideShowProject={props.handleHideShowProject}
                handleOpenProject={props.handleOpenProject}
            />
        </>
    )
}