import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';


const SearchForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([]);

    const updateContent = (e) => setContent(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();
        history.push(`/search/${content}`)



        // if (content.length > 500) {
        //     return setErrors(['Comment must be less than 500 characters.']);
        // }

        // const payload = {
        //     content,
        //     workout_id: workoutId
        // }


        // await dispatch(createComment(payload))
        //     .then(() => {
        //         setContent('')
        //         setErrors([])
        //     })
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data?.errors) setErrors(data.errors);
        //     });
    };

    return (
        <div style={{ width: '100%' }}>
            <form onSubmit={handleSubmit} className="SearchForm">
                <label >
                    <input
                        type='text'
                        value={content}
                        placeholder='Search...'
                        onChange={updateContent}
                    />
                </label>
                <button type='submit' className="addButton">Search</button>
            </form>
        </div>
    );


}

export default SearchForm;
