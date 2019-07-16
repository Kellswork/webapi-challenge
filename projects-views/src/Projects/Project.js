import React from 'react'
import styled from 'styled-components';

const Div = styled.div`
width: 400px;
height: 100px;
padding: 10px;
margin: 10px;
border: 0;
box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.12);
`;

const Project = ({ project }) => {
    return (
        <Div>
            <li>name: {project.name}</li>
            <li>description: {project.description}</li>
        </Div>
    )
}

export default Project
