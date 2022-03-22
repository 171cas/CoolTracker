import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createWorkout } from "../../store/workouts";

import './WorkoutCreate.css'

const WorkoutCreate = () => {
    const dispatch = useDispatch();

    const [date, setDate] = useState('') //`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    const [notes, setNotes] = useState('')
    const [completion_time, setCompletionT] = useState('')
    const [calories_burned, setCaloriesB] = useState('')
    const [body_weight, setBodyW] = useState('')

    const [errors, setErrors] = useState([]);

    const updateDate = (e) => setDate(e.target.value)
    const updateNotes = (e) => setNotes(e.target.value)
    const updateCompletionT = (e) => setCompletionT(e.target.value)
    const updateCaloriesB = (e) => setCaloriesB(e.target.value)
    const updateBodyW = (e) => setBodyW(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            date,
            notes,
            completion_time: +completion_time,
            calories_burned: +calories_burned,
            body_weight: +body_weight
        }

        let new_workout = await dispatch(createWorkout(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            });
        if (new_workout) {
            setDate('')
            setNotes('')
            setCompletionT('')
            setCaloriesB('')
            setBodyW('')
            setErrors([])
        }
    };

    return (
        <div className="createWOCont">
            <section>
                <ul>
                    {errors?.map((error, idx) => <li className='important' key={idx}>{error}</li>)}
                </ul>
                <form className="createWOForm" onSubmit={handleSubmit}>
                    <h3>Workout #ID</h3>

                    <label className="singleLine">
                        <p>Date:</p>
                        <input
                            type='date'
                            required
                            value={date}
                            onChange={updateDate}
                        />
                    </label>
                    <label className="singleLine">
                        <p>Notes</p>
                        <input
                            type='text'
                            placeholder='Notes'
                            value={notes}
                            onChange={updateNotes}
                        />
                    </label>
                    <label className="singleLine">
                        <p>Completion Time</p>
                        <input
                            type='number'
                            placeholder='Completion Time'
                            value={completion_time}
                            onChange={updateCompletionT}
                            min='1'
                            max='86400'
                        />
                    </label>
                    <label className="singleLine">
                        <p>Calories Burned</p>
                        <input
                            type='number'
                            placeholder='Calories Burned'
                            value={calories_burned}
                            onChange={updateCaloriesB}
                            min='1'
                            max='20000'
                        />
                    </label>
                    <label className="singleLine">
                        <p>Body Weight</p>
                        <input
                            type='number'
                            placeholder='Body Weight'
                            value={body_weight}
                            onChange={updateBodyW}
                            min='1'
                            max='1500'
                        />
                    </label>
                    <button type='submit' className="addButton">Create New Workout</button>
                </form>
            </section>
        </div>
    );


}

export default WorkoutCreate;
