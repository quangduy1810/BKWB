import React, { useEffect, useState } from 'react';
import './Project.css'
import { Card } from 'react-bootstrap';
import axios from 'axios';
import {
    Link
} from "react-router-dom";


const Project = () => {
    const [projects, setProject] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('https://bkworkboard.herokuapp.com/projects');
            const{ projects } = res.data;
            setProject(projects);
        }
        getData();
    }, []);
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
            {projects.map(project => (
                <Card
                bg={colors[Math.floor(Math.random() * colors.length)].toLowerCase()}
                text='light'
                style={{ width: '18rem' }}
                className="mb-2 project"
                >
                    <Link to={`/board/${project._id}`} style={{ textDecoration: 'none', color: 'rgba(255,255,255)' }}>
                        <Card.Body>
                        <Card.Title>{project.name}</Card.Title>
                        <Card.Text>
                            Date Created: {new Date(project.created_at).toLocaleString()}
                        </Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
            ))}
            
        </div>
    )
}

export default Project;