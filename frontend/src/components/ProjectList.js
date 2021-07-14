function ProjectList (props) {
    return (
        <ul>
            {props.projectList.map((item) => {
                return(
                    <li key={item.id}>
                        <h2>title</h2>
                        <p>description</p>
                        <button>edit</button>
                        <button>delete</button>
                        <button>hide/show</button>
                    </li>
                )
            })}
        </ul>
    )
}

export default ProjectList;