function ProjectListPanel() {
    return (
        <>
            <h1>PROJECTS</h1>
            <button>+ project</button>
            <ul>
                <li>
                    <h2>title</h2>
                    <p>description</p>
                    <button>edit</button>
                    <button>delete</button>
                    <button>hide/show</button>
                </li>
            </ul>
        </>
    )
}

export default ProjectListPanel;