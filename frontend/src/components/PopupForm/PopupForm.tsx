import {Button} from "../Button/Button";

interface Props {
    handleSubmitForm: any;
    name: string;
    title: string;
    isDescription: boolean;
    description: string | null;
    handleCancelAddBtn: any;
    handleAddBtn: any;
}

export const PopupForm = (props: Props) => {
    return (
        <div className="popup-form">
            <form action="" onSubmit={props.handleSubmitForm}>
                <h2>{props.name}</h2>
                <div>
                    <label>title:
                        <input
                            name="title"
                            type="text"
                            defaultValue={props.title}
                        />
                    </label>
                </div>
                {props.isDescription ?
                    <div>
                        <label>description:
                            <textarea
                                name="description"
                                id=""
                                cols={30}
                                rows={10}
                                defaultValue={props.description ? props.description : ''}
                            />
                        </label>
                    </div>
                    : null
                }
                <Button
                    click={props.handleCancelAddBtn}
                    description={"cancel"}
                />
                <Button
                    type="submit"
                    click={props.handleAddBtn}
                    description={props.name.indexOf("edit") === 0 ? "modify" : "add"}
                />
            </form>
        </div>
    )
}