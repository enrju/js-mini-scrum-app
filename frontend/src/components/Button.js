function Button (props) {
    return (
        <button onClick={props.click}>
            {props.description}
        </button>
    )
}

export default Button;