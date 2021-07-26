import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Board = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://bkworkboard.herokuapp.com/projects/${id}`);
            const{ project } = res.data;
            setProject(project);
            setLoading(false);
        }
        getData();
    }, [id]);

    return  (!isLoading &&(
        <div>
            <h1 style={{ fontWeight: 'lighter' }}>
                { project.name }
            </h1>

            <Button variant="primary" size="lg" style={{ margin: '20px' }}>Add a card</Button>

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
                            <Card.Text>
                                {project.backlogs.map(task => (
                                    <Alert variant={task.priority=='High'?'alert':'warning'}>
                                        {task.name}
                                    </Alert>
                                ))}
                            </Card.Text>
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
                        <Card.Body>
                        <Card.Title>Doing</Card.Title>
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
                        <Card.Body>
                        <Card.Title>Done</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>)
    )
}

export default Board;