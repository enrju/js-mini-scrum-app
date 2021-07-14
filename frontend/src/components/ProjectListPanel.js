import Button from './Button';
import ProjectList from './ProjectList';

function ProjectListPanel(props) {
    return (
        <>
            <h1>PROJECTS</h1>
            <Button 
                click={null}
                description={"+ project"}
            />
            <ProjectList
                projectList={props.projectList}
            />
        </>
    )
}

export default ProjectListPanel;