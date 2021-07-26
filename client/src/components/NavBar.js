import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';
import {
    Link
} from "react-router-dom";

const NavBar = () => {
    const [user, setUser] = useState(null);
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
    return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand>
                <Link to="/" style={{ textDecoration: 'none', color: 'rgba(255,255,255,.5)' }}>Work Board</Link>
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav>
                    <Link to="/" style={{ textDecoration: 'none', color: 'rgba(255,255,255,.5)' }}>Work Board</Link>
                </Nav>
            </Nav>
            <Nav>
                <Nav>
                    {!user && <Link to="/login" style={{ textDecoration: 'none', color: 'rgba(255,255,255,.5)' }}>Login</Link>}
                </Nav>
                <Nav.Link eventKey={2} href="#memes">
                    Logout
                </Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    </div>
    )
}

export default NavBar;