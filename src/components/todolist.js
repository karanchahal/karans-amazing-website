import _ from 'lodash';
import React, { Component } from 'react';
import ToDoListHeader from './todolistheader';
import ToDoListItem from './todolistitem';

export default class ToDoList extends Component {

  renderItems() {
    return _.map(this.props.todos, (todo, index) => <ToDoListItem key={index} {...todo}/>)
  }

  render() {
    //console.log(this.props.todos)

    return (
      <table>
        <ToDoListHeader />
        <tbody>
        {this.renderItems()}
        </tbody>
      </table>
    );
  }
}
