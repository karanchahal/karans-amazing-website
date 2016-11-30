import React, { Component } from 'react';
import ToDoList from './components/todolist';

const todos = [
  {
    task: 'make react tutorial',
    isCompleted: false
  },
  {
    task: 'YO',
    isCompleted: true
  }
]

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos
    };
  }

  render() {
    return (
      <div>
        <h1> React To Do </h1>
        <ToDoList todos={this.state.todos} />
      </div>
    );
  }
}


export default App;
