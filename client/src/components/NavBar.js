import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {
    Link
} from "react-router-dom";

const NavBar = () => {
    const [user, setUser] = useState();
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
                <Nav.Link href="#">{user}</Nav.Link>
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