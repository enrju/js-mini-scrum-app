import Button from "./Button";

function PopupForm (props) {
    return (
        <div>
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
                                cols="30" 
                                rows="10"
                                defaultValue={props.description}
                            ></textarea>
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

export default PopupForm;