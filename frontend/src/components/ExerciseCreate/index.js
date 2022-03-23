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
    const [completion_time, setComT] = useState('')

    const [errors, setErrors] = useState([]);

    const updateName = (e) => setName(e.target.value)
    const updateNotes = (e) => setNotes(e.target.value)
    const updateDistance = (e) => setDistance(e.target.value)
    const updateSets = (e) => setSets(e.target.value)
    const updateReps = (e) => setReps(e.target.value)
    const updateRest = (e) => setRest(e.target.value)
    const updateWeight = (e) => setWeight(e.target.value)
    const updateComt = (e) => setComT(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            workout_id: propId,
            name,
            notes,
            distance,
            sets,
            reps,
            rest,
            weight,
            completion_time
        }

        console.log(payload, 'payload \n\n\n\n\n')

        await dispatch(createExercise(payload))
            .then(() => {
                setName('')
                setNotes('')
                setDistance('')
                setSets('')
                setReps('')
                setRest('')
                setWeight('')
                setComT('')
                setErrors([])
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data?.errors);
            });

    };

    return (
        <section>
            <div className="singleEx">
                <ul>
                    {errors?.map((error, idx) => <li className='important' key={idx}>{error}</li>)}
                </ul>
                <form className="createExForm" onSubmit={handleSubmit}>
                    <h3>Add an Exercise:</h3>
                    <label className="singleLine">
                        Name
                        <input
                            required
                            type='text'
                            maxLength={30}
                            placeholder='Name'
                            value={name}
                            onChange={updateName}
                        />
                    </label>
                    <label className="singleLine">
                        Notes
                        <input
                            type='text'
                            maxLength={500}
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
                    <label className="singleLine">
                        Completion Time
                        <input
                            type='number'
                            placeholder='completion Time'
                            value={completion_time}
                            onChange={updateComt}
                            min='0'
                            max='86400'
                        />
                    </label>
                    <button type='submit' className="exButton">Add Exercise</button>
                </form>
            </div>
        </section>
    );


}

export default ExerciseCreate;
