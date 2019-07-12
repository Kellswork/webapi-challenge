import React from 'react'
import Project from './Project';
import styled from 'styled-components';


const H1 = styled.h1`
font-size: 25px;
font-weight: 700;
`;

const ProjectList = ({projects}) => {
    const data = projects.map(project => <Project key={project.id} project={project} />);
    return (
        <div>
            <H1>Projects</H1>
            <ul>
            {data}
            </ul>
        </div>
    )
}

export default ProjectList


