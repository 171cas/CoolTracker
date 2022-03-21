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
        setErrors([]);

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
                if (data && data?.errors) setErrors(data?.errors);
            });
        setDate('')
        setNotes('')
        setCompletionT('')
        setCaloriesB('')
        setBodyW('')
        setErrors([])
    };

    return (
        <section>
            <ul>
                {errors?.map((error, idx) => <li className='required' key={idx}>{error}</li>)}
            </ul>
            <div className="createWOCont">
                <form className="createWOForm" onSubmit={handleSubmit}>
                    <h3>Workout #ID</h3>

                    <div className="singleLine">
                        <p>Date:</p>
                        <input
                            type='date'
                            required
                            value={date}
                            onChange={updateDate}
                        />
                    </div>
                    <div className="singleLine">
                        <p>Notes</p>
                        <input
                            type='textArea'
                            placeholder='Notes'
                            value={notes}
                            onChange={updateNotes}
                        />
                    </div>
                    <div className="singleLine">
                        <p>Completion Time</p>
                        <input
                            type='number'
                            placeholder='Completion Time'
                            value={completion_time}
                            onChange={updateCompletionT}
                            min='1'
                            max='86400'
                        />
                    </div>
                    <div className="singleLine">
                        <p>Calories Burned</p>
                        <input
                            type='number'
                            placeholder='Calories Burned'
                            value={calories_burned}
                            onChange={updateCaloriesB}
                            min='1'
                            max='20000'
                        />
                    </div>
                    <div className="singleLine">
                        <p>Body Weight</p>
                        <input
                            type='number'
                            placeholder='Body Weight'
                            value={body_weight}
                            onChange={updateBodyW}
                            min='1'
                            max='1500'
                        />
                    </div>
                    <button type='submit' className="addButton">Create new Workout</button>
                </form>
            </div>
        </section>
    );


}

export default WorkoutCreate;
