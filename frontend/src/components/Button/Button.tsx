interface Props {
    type?: "button" | "submit" | "reset" | undefined;
    // click: MouseEventHandler<HTMLButtonElement>;
    click: any;
    description: string;
}

export const Button = (props: Props) => {
    return (
        <button
            type={props.type ? props.type : "button"}
            onClick={props.click}
        >
            {props.description}
        </button>
    )
}