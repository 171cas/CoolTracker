import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { editWorkout } from "../../store/workouts";
import { useParams, useHistory } from 'react-router-dom';

const WorkoutEdit = () => {
    let { workoutId } = useParams();

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const workouts = useSelector((state) => state.workouts)
    const workout = workouts[workoutId]

    if (workout?.user_id !== sessionUser.id) {
        throw new Error('Access Denied')
    }

    const [date, setDate] = useState(workout?.date) //`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    const [notes, setNotes] = useState(workout?.notes ? workout?.notes : '')
    const [completion_time, setCompletionT] = useState(workout?.completion_time ? workout?.completion_time : '')
    const [calories_burned, setCaloriesB] = useState(workout?.calories_burned ? workout?.calories_burned : '')
    const [body_weight, setBodyW] = useState(workout?.body_weight ? workout?.body_weight : '')

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
            id: workoutId,
            date,
            notes,
            completion_time: +completion_time,
            calories_burned: +calories_burned,
            body_weight: +body_weight
        }

        let workout = await dispatch(editWorkout(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data?.errors) setErrors(data?.errors);
            });

        if (workout) { history.push(`/workout/${workoutId}`) }
    };

    return (
        <section>
            <ul>
                {errors?.map((error, idx) => <li className='required' key={idx}>{error}</li>)}
            </ul>
            <div className="createWOCont">
                <form className="createWOForm" onSubmit={handleSubmit}>
                    <input
                        type='date'
                        required
                        value={date}
                        onChange={updateDate}
                    />
                    <input
                        type='text'
                        placeholder='Notes'
                        value={notes}
                        onChange={updateNotes}
                    />
                    <input
                        type='number'
                        placeholder='Completion Time'
                        value={completion_time}
                        onChange={updateCompletionT}
                        min='1'
                        max='86400'
                    />
                    <input
                        type='number'
                        placeholder='Calories Burned'
                        value={calories_burned}
                        onChange={updateCaloriesB}
                        min='1'
                        max='20000'
                    />
                    <input
                        type='number'
                        placeholder='Body Weight'
                        value={body_weight}
                        onChange={updateBodyW}
                        min='1'
                        max='1500'
                    />
                    <button type='submit'>Edit new Workout</button>
                </form>
            </div>
        </section>
    );


}

export default WorkoutEdit;
