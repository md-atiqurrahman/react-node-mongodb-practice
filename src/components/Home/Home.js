import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/user')
        .then(res => res.json())
        .then(data => setUsers(data))
    },[])

    const handleDeleteUser = id =>{
        const url = `http://localhost:5000/user/${id}`;

        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                const remaining = users.filter(user => user._id !== id)
                setUsers(remaining)
            }
        })

    }

    return (
        <div>
            <h2>Available user: {users.length}</h2>
            <ul>
                {
                    users.map(user => <li key={user._id}>
                        Name: {user.name}
                        ::
                        email: {user.email}
                       <Link to={`/updateUser/${user._id}`}> <button>update</button></Link>
                        <button onClick={ () => handleDeleteUser(user._id)}>X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Home;