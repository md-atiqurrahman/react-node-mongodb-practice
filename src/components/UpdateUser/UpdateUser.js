import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const url = `http://localhost:5000/user/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])

    const handleUpdateUser = event => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const user = { name, email };

        const url = `http://localhost:5000/user/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    alert('user updated in database successfully')
                    event.target.reset();
                    const url = `http://localhost:5000/user/${id}`;
                    fetch(url)
                        .then(res => res.json())
                        .then(data => setUser(data))
                    document.getElementById('userName').innerHTML = user.name;
                }
            })
    }

    return (
        <div>
            <h2>User: <span id='userName'>{user.name}</span></h2>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name="name" id="" required />
                <br />
                <input type="email" name="email" id="" required />
                <br />
                <input type="submit" value="update" />
            </form>
        </div>
    );
};

export default UpdateUser;