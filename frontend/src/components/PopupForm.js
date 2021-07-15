import Button from "./Button";

function PopupForm (props) {
    return (
        <div>
            <form action="">
                <h2>{props.name}</h2>
                <div>
                    <label>title:
                        <input name="title" type="text" />
                    </label>
                </div>
                {props.isDescription ?
                    <div>
                        <label>description:
                            <textarea name="description" id="" cols="30" rows="10"></textarea>
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
                    description={"add"}
                />
            </form>
        </div>
    )
}

export default PopupForm;