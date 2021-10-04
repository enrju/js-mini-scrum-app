function Button (props) {
    return (
        <button 
            type={props.type ? props.type : "button"}
            onClick={props.click}
        >
            {props.description}
        </button>
    )
}

export default Button;