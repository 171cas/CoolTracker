import { getUsers } from '../../store/users';
import { getExercises } from '../../store/exercises';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import SearchForm from './SearchForm';
import ExerciseDetail from '../ExerciseDetail';
import UserBrowser from './UserBrowser';

const Search = () => {
    const { search } = useParams()
    const urlSearch = (search === undefined ? '' : `/${search}`)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch(`/api/search${urlSearch}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setUsers(result.users);
                    setExercises(result.exercises);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [search])

    console.log(users)
    console.log(exercises)
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <SearchForm />
                <br />

                <div className='containerWO' >
                    <div className='singleWO' >
                        <div className='containerEx' style={{ marginBottom: '15px' }}>
                            <h3>Users:</h3>
                            {users?.length === 0 && <h3 style={{ color: '#FF784F', margin: '15px 0' }}>No users</h3>}
                            <UserBrowser users={users} />
                        </div >
                    </div>
                </div>
                <br />
                <div className='containerWO'>
                    <div className='singleWO'>
                        <div className='containerEx'>
                            <h3 style={{ textDecoration: "none" }} >Exercises</h3>
                            {exercises?.length === 0 && <h3 style={{ color: '#FF784F', margin: '15px 0' }} >No exercises</h3>}
                            {exercises?.map(exercise => {
                                return (<ExerciseDetail propId={exercise.id} key={exercise.id} />) // change it later
                            }
                            )}
                        </div >
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
