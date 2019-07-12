import React, { Component } from 'react';
import axios from 'axios';
import ProjectList from './Projects/ProjectList';
import './App.css';

export default class App extends Component {
  state = {
    projects: [],
    actions: [],
    error: ''
  };

  fetchProjectsWithAxios = () => {
    axios
      .get('http://localhost:4200/api/projects/')
      .then(response => {
        this.setState({ projects: response.data });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  componentDidMount() {
    this.fetchProjectsWithAxios();
  }

  render() {
    return (
      <div>
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}
