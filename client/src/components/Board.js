import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Alert, Modal, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Board = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://bkworkboard.herokuapp.com/projects/${id}`, {
                headers: {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
            });
            const{ project } = res.data;
            setProject(project);
            setLoading(false);
        }
        getData();
    }, [project]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://bkworkboard.herokuapp.com/backlogs/${id}`, {
                headers: {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
            });
        } catch(error) {
            console.log(error);
        }
    }

    const handleUpdate = async (e, id) => {
        console.log(status);
        e.preventDefault();
        const taskUpdate = {
            status: status
        }
        try {
            await axios.put(`https://bkworkboard.herokuapp.com/backlogs/${id}`, JSON.stringify(taskUpdate), {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                }
            });
        } catch(error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectName = project.name;
        const owner = project.owner.username;
        const task = {
            name: name, 
            priority: priority, 
            due_date: dueDate, 
            status: status, 
            project: projectName, 
            owner: owner
        };
        try {
            await axios.post('https://bkworkboard.herokuapp.com/backlogs', JSON.stringify(task), {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                }
            });
        } catch(error) {
            console.log(error);
        }
    }

    return  (!isLoading &&(
        <div>
            <h1 style={{ fontWeight: 'lighter' }}>
                { project.name }
            </h1>

            <Button variant="primary" size="lg" style={{ margin: '20px' }} onClick={handleShow}>Add Task</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{width: '100%', margin: 'auto'}} onSubmit={handleSubmit} className="d-grid">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control type="username" placeholder="Enter task name" 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPriority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setPriority(e.target.value)}>
                                <option>Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter username" 
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="formBasicStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                                <option>Select Status</option>
                                <option value="To Do">To Do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleClose} >
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Row xs={1} md={3} className="g-1">
                <Col>
                    <Card
                        bg='info'
                        text='light'
                        style={{ width: '20rem' }}
                        className="mb-2 project"
                    >
                        <Card.Header>To Do</Card.Header>
                        <Card.Body>
                            {project.backlogs.map(task => ((task.status==='To Do') &&
                                <Alert variant={task.priority==='High'?'danger':task.priority==='Medium'?'warning':'success'} key={task._id}>
                                    <p>{task.name}</p>
                                    <p>Due date: {task.due_date}</p>
                                    <OverlayTrigger
                                    trigger="click"
                                    key={task._id}
                                    placement="bottom"
                                    overlay={
                                        <Popover id={`popover-positioned-bottom`}>
                                        <Popover.Header as="h3">{task.name}</Popover.Header>
                                        <Popover.Body>
                                            <Form onSubmit={(e) => handleUpdate(e, task._id)}>
                                                <Form.Group className="mb-5" controlId="formBasicStatus">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                                                        <option>Select Status</option>
                                                        <option value="To Do">To Do</option>
                                                        <option value="Doing">Doing</option>
                                                        <option value="Done">Done</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Update
                                                </Button>
                                            </Form>
                                        </Popover.Body>
                                        </Popover>
                                    }
                                    >
                                        <Button variant="outline-secondary" size="sm">Update</Button>
                                    </OverlayTrigger>
                                    <Button variant="outline-secondary" size="sm" onClick={() => handleDelete(task._id)}>Delete</Button>
                                </Alert>
                            ))}
                        </Card.Body>
                    </Card>
                    
                </Col>
                <Col>
                    <Card
                        bg='warning'
                        text='light'
                        style={{ width: '20rem' }}
                        className="mb-2 project"
                    >
                        <Card.Header>Doing</Card.Header>
                        <Card.Body>
                            {project.backlogs.map(task => ((task.status==='Doing') &&
                                <Alert variant={task.priority==='High'?'danger':task.priority==='Medium'?'warning':'success'} key={task._id}>
                                    <p>{task.name}</p>
                                    <p>Due date: {task.due_date}</p>
                                    <OverlayTrigger
                                    trigger="click"
                                    key={task._id}
                                    placement="bottom"
                                    overlay={
                                        <Popover id={`popover-positioned-bottom`}>
                                        <Popover.Header as="h3">{task.name}</Popover.Header>
                                        <Popover.Body>
                                            <Form onSubmit={(e) => handleUpdate(e, task._id)}>
                                                <Form.Group className="mb-5" controlId="formBasicStatus">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                                                        <option>Select Status</option>
                                                        <option value="To Do">To Do</option>
                                                        <option value="Doing">Doing</option>
                                                        <option value="Done">Done</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Update
                                                </Button>
                                            </Form>
                                        </Popover.Body>
                                        </Popover>
                                    }
                                    >
                                        <Button variant="outline-secondary" size="sm">Update</Button>
                                    </OverlayTrigger>
                                    <Button variant="outline-secondary" size="sm" onClick={() => handleDelete(task._id)}>Delete</Button>
                                </Alert>
                            ))}
                        </Card.Body>
                    </Card>
                    
                </Col>
                <Col>
                    <Card
                        bg='success'
                        text='light'
                        style={{ width: '20rem' }}
                        className="mb-2 project"
                    >
                        <Card.Header>Done</Card.Header>
                        <Card.Body>
                            {project.backlogs.map(task => ((task.status==='Done') &&
                                <Alert variant={task.priority==='High'?'danger':task.priority==='Medium'?'warning':'success'} key={task._id}>
                                    <p>{task.name}</p>
                                    <p>Due date: {task.due_date}</p>
                                    <OverlayTrigger
                                    trigger="click"
                                    key={task._id}
                                    placement="bottom"
                                    overlay={
                                        <Popover id={`popover-positioned-bottom`}>
                                        <Popover.Header as="h3">{task.name}</Popover.Header>
                                        <Popover.Body>
                                            <Form onSubmit={(e) => handleUpdate(e, task._id)}>
                                                <Form.Group className="mb-5" controlId="formBasicStatus">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                                                        <option>Select Status</option>
                                                        <option value="To Do">To Do</option>
                                                        <option value="Doing">Doing</option>
                                                        <option value="Done">Done</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Update
                                                </Button>
                                            </Form>
                                        </Popover.Body>
                                        </Popover>
                                    }
                                    >
                                        <Button variant="outline-secondary" size="sm">Update</Button>
                                    </OverlayTrigger>
                                    <Button variant="outline-secondary" size="sm" onClick={() => handleDelete(task._id)}>Delete</Button>
                                </Alert>
                            ))}
                        </Card.Body>
                    </Card>
                    
                </Col>
            </Row>
        </div>)
    )
}

export default Board;