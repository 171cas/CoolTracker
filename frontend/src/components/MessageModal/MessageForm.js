import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createMessage } from "../../store/messages";


const MessageForm = ({ chat_id }) => {
    const dispatch = useDispatch();

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([]);

    const updateContent = (e) => setContent(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (content.length > 500) {
            return setErrors(['Message must be less than 500 characters.']);
        }

        const payload = {
            message: content,
            chat_id: chat_id
        }


        await dispatch(createMessage(payload))
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
        <div style={{ width: '100%' }}>
            <section >
                <ul>
                    {errors?.map((error, idx) => <li className='important' key={idx}>{error}</li>)}
                </ul>
                <form onSubmit={handleSubmit} className="commentForm">
                    <label >
                        <input
                            type='text'
                            required
                            value={content}
                            placeholder='Message'
                            onChange={updateContent}
                        />
                    </label>
                    <button type='submit' className="addButton">Send</button>
                </form>
            </section>
        </div>
    );


}

export default MessageForm;
