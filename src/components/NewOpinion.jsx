import {isNotEmpty} from "../util/validation.js";
import {useActionState, use} from "react";
import {OpinionsContext} from "../store/opinions-context.jsx";
import Submit from "./Submit.jsx";


export function NewOpinion() {
    const {addOpinion} = use(OpinionsContext);

    async function saveOpinion(prevFormState, formData) {
        const userName = formData.get('userName');
        console.log(userName);
        const title = formData.get('title');
        const body = formData.get('body');

        let errors = [];
        if (!isNotEmpty(userName)) {
            errors.push("Username cannot be empty");
        }
        if (!isNotEmpty(title)) {
            errors.push("Title cannot be empty");
        }
        if (!isNotEmpty(body)) {
            errors.push("Your opinion cannot be empty");
        }

        if (errors.length > 0) {
            return {
                errors, inputValues: {
                    userName,
                    title,
                    body
                }
            };
        }
        await addOpinion({title, body, userName}, userName);
        return {errors: null}
    }

    const [formState, formAction] = useActionState(saveOpinion, {errors: null});
    return (
        <div id="new-opinion">
            <h2>Share your opinion!</h2>
            <form action={formAction}>
                <div className="control-row">
                    <p className="control">
                        <label htmlFor="userName">Your Name</label>
                        <input type="text" id="userName" name="userName"
                               defaultValue={formState.inputValues?.username}/>
                    </p>

                    <p className="control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title"
                               defaultValue={formState.inputValues?.title}/>
                    </p>
                </div>
                <p className="control">
                    <label htmlFor="body">Your Opinion</label>
                    <textarea id="body" name="body" rows={5}
                              defaultValue={formState.inputValues?.description}></textarea>
                </p>
                {formState.errors && <ul className="error">
                    {formState.errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>}
               <Submit />
            </form>
        </div>
    );
}
