import React, { Component } from 'react';


export default class ToDoListHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Task</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  }
}
