import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';
import {
    Link,
    useHistory
} from "react-router-dom";

const NavBar = () => {
    const [user, setUser] = useState(null);
    const history = useHistory();
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('https://bkworkboard.herokuapp.com/users', {
                headers: {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
            });
            const{ projects } = res.data;
            setUser(projects);
        }
        getData();
    }, []);

    const logout = () => {
        localStorage.clear();
        history.push('/');
    }
    return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand>
                <Link to="/" style={{ textDecoration: 'none', color: 'rgba(255,255,255,.5)' }}>Work Board</Link>
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'rgba(255,255,255,.5)' }}>Work Board</Link>
                </Nav>
            </Nav>
            <Nav>
                <Nav>
                    {user && user.name}
                </Nav>
                <Nav.Link onClick={logout}>
                    Logout
                </Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    </div>
    )
}

export default NavBar;