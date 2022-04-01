import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createComment } from "../../store/comments";


const CommentForm = ({ workoutId }) => {
    const dispatch = useDispatch();

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([]);

    const updateContent = (e) => setContent(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (content.length > 500) {
            return setErrors(['Comment must be less than 500 characters.']);
        }

        const payload = {
            content,
            workout_id: workoutId
        }


        await dispatch(createComment(payload))
            .then(() => {
                setContent('')
                setErrors([])
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            });
    };

    return (
        <div className="createWOCont">
            <section>
                <ul>
                    {errors?.map((error, idx) => <li className='important' key={idx}>{error}</li>)}
                </ul>
                <form onSubmit={handleSubmit}>
                    <label >
                        <input
                            type='text'
                            required
                            value={content}
                            placeholder='Comment'
                            onChange={updateContent}
                        />
                    </label>
                    <button type='submit' className="addButton">Post</button>
                </form>
            </section>
        </div>
    );


}

export default CommentForm;
