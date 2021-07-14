function Button (props) {
    return (
        <button click={props.click}>
            {props.description}
        </button>
    )
}

export default Button;