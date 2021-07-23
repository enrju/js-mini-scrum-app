import Button from './Button';
import ProjectList from './ProjectList';

function ProjectListPanel(props) {
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

export default ProjectListPanel;