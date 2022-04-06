import { getUsers } from '../../store/users';
import { getExercises } from '../../store/exercises';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';

const Search = () => {
    const { search } = useParams()
    const urlSearch = (search === undefined ? '' : `/${search}`)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [exercises, setExercises] = useState([]);

    console.log(urlSearch, 'urlSearch')
    console.log(`/api/search${urlSearch}`)

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
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    console.log(users)
    console.log(exercises)
    return <h1>hello</h1>
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    // } else {
    //     return (
    //         <>
    //             <ul>
    //                 {users.map(item => (
    //                     <li key={item.id}>
    //                         {item.username}
    //                     </li>
    //                 ))}
    //             </ul>
    //             <ul>
    //                 {exercises.map(item => (
    //                     <li key={item.id}>
    //                         {item.name}
    //                     </li>
    //                 ))}
    //             </ul>
    //         </>
    //     );
    // }
}

export default Search;
