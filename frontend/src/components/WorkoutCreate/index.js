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

        //date frontend validation
        const today = new Date()
        const month = (today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`)
        const dateVar = `${today.getFullYear()}-${month}-${today.getDate()}`

        if (date > dateVar) {
            return setErrors(['Workout date must be in the past.']);
        }

        const payload = {
            date,
            notes,
            completion_time,
            calories_burned,
            body_weight
        }


        await dispatch(createWorkout(payload))
            .then(() => {
                setDate('')
                setNotes('')
                setCompletionT('')
                setCaloriesB('')
                setBodyW('')
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
                <form className="createWOForm" onSubmit={handleSubmit}>
                    <h3>Workout #ID</h3>

                    <label className="singleLine">
                        <p>Date: (Must be in the past) </p>
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
                            maxLength={500}
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
                        <div className="inputClass">

                            <input
                                type='number'
                                placeholder='Calories Burned'
                                value={calories_burned}
                                onChange={updateCaloriesB}
                                min='1'
                                max='20000'
                            />
                        </div>
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
