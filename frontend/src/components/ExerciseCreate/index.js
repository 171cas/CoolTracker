import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createExercise } from "../../store/exercises";
import './ExerciseCreate.css'

const ExerciseCreate = ({ propId }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [notes, setNotes] = useState('')
    const [distance, setDistance] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [rest, setRest] = useState('')
    const [weight, setWeight] = useState('')

    const [errors, setErrors] = useState([]);

    const updateName = (e) => setName(e.target.value)
    const updateNotes = (e) => setNotes(e.target.value)
    const updateDistance = (e) => setDistance(e.target.value)
    const updateSets = (e) => setSets(e.target.value)
    const updateReps = (e) => setReps(e.target.value)
    const updateRest = (e) => setRest(e.target.value)
    const updateWeight = (e) => setWeight(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            workout_id: propId,
            name,
            notes,
            distance: +distance,
            sets: +sets,
            reps: +reps,
            rest: +rest,
            weight: +weight,
        }

        let new_exercise = await dispatch(createExercise(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data?.errors) setErrors(data?.errors);
            });

        setName('')
        setNotes('')
        setDistance('')
        setSets('')
        setReps('')
        setRest('')
        setWeight('')
        setErrors([])
    };

    return (
        <section>
            <ul>
                {errors?.map((error, idx) => <li className='required' key={idx}>{error}</li>)}
            </ul>
            <div className="singleEx">
                <form className="createExForm" onSubmit={handleSubmit}>
                    <label className="singleLine">
                        Name
                        <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={updateName}
                        />
                    </label>
                    <label className="singleLine">
                        Notes
                        <input
                            type='text'
                            placeholder='Notes'
                            value={notes}
                            onChange={updateNotes}
                        />
                    </label>
                    <label className="singleLine">
                        Distance
                        <input
                            type='number'
                            placeholder='Distance'
                            value={distance}
                            onChange={updateDistance}
                            min='0'
                            max='10000'
                        />
                    </label>
                    <label className="singleLine">
                        Sets
                        <input
                            type='number'
                            placeholder='Sets'
                            value={sets}
                            onChange={updateSets}
                            min='1'
                            max='1000'
                        />
                    </label>
                    <label className="singleLine">
                        Reps
                        <input
                            type='number'
                            placeholder='Reps'
                            value={reps}
                            onChange={updateReps}
                            min='1'
                            max='1000'
                        />
                    </label>
                    <label className="singleLine">
                        Rest
                        <input
                            type='number'
                            placeholder='Rest'
                            value={rest}
                            onChange={updateRest}
                            min='0'
                            max='86400'
                        />
                    </label>
                    <label className="singleLine">
                        Added Weight
                        <input
                            type='number'
                            placeholder='Added Weight'
                            value={weight}
                            onChange={updateWeight}
                            min='0'
                            max='5000'
                        />
                    </label>
                    <button type='submit' className="exButton">Add Exercise</button>
                </form>
            </div>
        </section>
    );


}

export default ExerciseCreate;
