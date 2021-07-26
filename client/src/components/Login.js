import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {username, password};
        setIsPending(true);

        fetch('https://bkworkboard.herokuapp.com/users/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then((res) => {
            setIsPending(false);
            return res.json();
        }).then((data) => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            history.go(-1);
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <Form style={{width: '40rem', margin: 'auto'}} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                { !isPending && <Button variant="primary" type="submit">
                    Submit
                </Button> }
                { isPending && <Button variant="primary" type="submit" disabled>
                    Submit...
                </Button> }
            </Form>
        </div>
    )
}

export default Login;