import React from 'react';

const AddUser = () => {

    const handleAddUser = event =>{
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const user ={name, email};

        fetch('http://localhost:5000/user',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            alert('user added in database successfully')
            event.target.reset()
        })
    }

    return (
        <div>
            <h2>Please create a user</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" name="name" id="" required/>
                <br />
                <input type="email" name="email" id="" required/>
                <br />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddUser;