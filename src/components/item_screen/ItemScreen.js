import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ItemScreen extends Component {
    state = {
        description: this.props.item.description,
        assigned_to: this.props.item.assigned_to,
        due_date: this.props.item.due_date,
        completed: this.props.item.completed
    }

    handleChange = (e) => {
        const { target } = e;

        if (target.id == "completed") {
            this.setState(state => ({
                ...state,
                [target.id]: target.checked
            }));
        } else {
            this.setState(state => ({
                ...state,
                [target.id]: target.value,
            }));
        }
    }

    editItem = () => {
        const { item } = this.props;
        var itemList = this.props.todoList.items;

        item.description = this.state.description;
        item.assigned_to = this.state.assigned_to;
        item.due_date = this.state.due_date;
        item.completed = this.state.completed;

        itemList[item.id] = item;

        // update the store
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            items: itemList,
        });
        this.props.history.goBack();
    }

    cancelEditItem = () => {
        this.props.history.goBack();
    }

    render() {
        // const todoList = this.props.todoList;
        // const { item } = this.props;

        return (
            <div id="todo_item" className="container white">
                <h5 id="item_heading" className="grey-text text-darken-3">Item</h5>

                <div className="input-field">
                    <label className="active">Description:</label>
                    <input className="active" type="text" name="description" id="description" onChange={this.handleChange} value={this.state.description} />
                </div>

                <div className="input-field">
                    <label className="active">Assigned To:</label>
                    <input className="active" type="text" name="assigned_to" id="assigned_to" onChange={this.handleChange} value={this.state.assigned_to} />
                </div>

                <div className="input-field">
                    <label className="active">Due Date:</label>
                    <input className="active" type="date" name="due_date" id="due_date" onChange={this.handleChange} value={this.state.due_date} />
                </div>

                <label>
                    <input type="checkbox" className="filled-in" name="completed" id="completed" onChange={this.handleChange} checked={this.state.completed} />
                    <span>Completed</span>
                </label>

                <div>
                    <a className="waves-effect waves-light btn" onClick={this.editItem}><i className="material-icons right">mode_edit</i>Submit</a>
                </div>

                <div>
                    <a className="waves-effect waves-light btn" onClick={this.cancelEditItem}><i className="material-icons right">close</i>Cancel</a>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    todoList.id = id;

    const { itemId } = ownProps.match.params;
    // console.log(itemId);
    var check = todoList.items[itemId];
    // console.log(check);
    const item = check == undefined ?
        {
            "key": todoList.items.length,
            "description": "",
            "due_date": "",
            "assigned_to": "",
            "completed": false
        } : todoList.items[itemId];
    // console.log(item);
    item.id = itemId;

    return {
        item,
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemScreen);