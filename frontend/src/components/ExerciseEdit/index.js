import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editExercise } from "../../store/exercises";

const ExerciseEdit = () => {
    let { exerciseId } = useParams();

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const exercises = useSelector((state) => state.exercises)
    const exercise = exercises[exerciseId]


    const workout_id = exercise?.workout_id
    const [name, setName] = useState(exercise?.name)
    const [notes, setNotes] = useState(exercise?.notes ? exercise?.notes : '')
    const [distance, setDistance] = useState(exercise?.distance ? exercise?.distance : '')
    const [sets, setSets] = useState(exercise?.sets ? exercise?.sets : '')
    const [reps, setReps] = useState(exercise?.reps ? exercise?.reps : '')
    const [rest, setRest] = useState(exercise?.rest ? exercise?.rest : '')
    const [weight, setWeight] = useState(exercise?.weight ? exercise?.weight : '')

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
            id: exerciseId,
            workout_id,
            name,
            notes,
            distance: +distance,
            sets: +sets,
            reps: +reps,
            rest: +rest,
            weight: +weight,
        }


        let exercise = await dispatch(editExercise(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data?.errors) setErrors(data?.errors);
            });
        if (exercise) { history.push(`/workout/${workout_id}`) }
    };

    return (
        <section>
            <ul>
                {errors?.map((error, idx) => <li className='required' key={idx}>{error}</li>)}
            </ul>
            <div className="createExCont">
                <form className="createExForm" onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={updateName}
                    />
                    <input
                        type='text'
                        placeholder='Notes'
                        value={notes}
                        onChange={updateNotes}
                    />
                    <input
                        type='number'
                        placeholder='Distance'
                        value={distance}
                        onChange={updateDistance}
                        min='0'
                        max='10000'
                    />
                    <input
                        type='number'
                        placeholder='Sets'
                        value={sets}
                        onChange={updateSets}
                        min='1'
                        max='1000'
                    />
                    <input
                        type='number'
                        placeholder='Reps'
                        value={reps}
                        onChange={updateReps}
                        min='1'
                        max='1000'
                    />
                    <input
                        type='number'
                        placeholder='Rest'
                        value={rest}
                        onChange={updateRest}
                        min='0'
                        max='86400'
                    />
                    <input
                        type='number'
                        placeholder='Added Weight'
                        value={weight}
                        onChange={updateWeight}
                        min='0'
                        max='5000'
                    />
                    <button type='submit'>Edit Exercise</button>
                </form>
            </div>
        </section>
    );


}

export default ExerciseEdit;
