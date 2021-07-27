import React, { useEffect, useState } from 'react';
import './Project.css'
import { Card, Form, Button, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {
    Link
} from "react-router-dom";


const Project = () => {
    const [projects, setProject] = useState([]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [estimateDueDate, setEstimateDueDate] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const owner = localStorage.getItem('user');
        const project = {
            name: name,
            estimate_due_date: estimateDueDate,
            owner: owner
        };
        try {
            await axios.post('https://bkworkboard.herokuapp.com/projects', JSON.stringify(project), {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                }
            });
        } catch(error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('https://bkworkboard.herokuapp.com/projects', {
                headers: {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
            });
            const{ projects } = res.data;
            setProject(projects);
        }
        getData();
    }, [projects]);
    const colors = ['Primary',
    'Secondary',
    'Success',
    'Danger',
    'Warning',
    'Info',
    'Dark'];

    return (
        <div>
            <h1>
                Projects
            </h1>
            <Button variant="primary" size="lg" style={{ margin: '20px' }} onClick={handleShow}>Add Task</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{width: '100%', margin: 'auto'}} onSubmit={handleSubmit} className="d-grid">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="username" placeholder="Enter task name" 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter username" 
                                onChange={(e) => setEstimateDueDate(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleClose} >
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Row xs={1} md={4} className="g-1 mx-auto">
                {projects.map((project, idx) => (
                    <Col>
                        <Card
                        bg={colors[idx].toLowerCase()}
                        text='light'
                        style={{ width: '18rem' }}
                        className="mb-2 project"
                        key={project._id}
                        >
                            <Link to={`/board/${project._id}`} style={{ textDecoration: 'none', color: 'rgba(255,255,255)' }}>
                                <Card.Body>
                                <Card.Title>{project.name}</Card.Title>
                                <Card.Text>
                                    <p>Date Created: {new Date(project.created_at).toLocaleString()}</p>
                                    <p>Created By: {project.owner.name}</p>
                                </Card.Text>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
            
        </div>
    )
}

export default Project;