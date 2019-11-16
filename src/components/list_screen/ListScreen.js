import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { conditionalExpression } from '@babel/types';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        // update the store
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            [target.id]: target.value,
        });
    }

    addItem = () => {
        const fireStore = getFirestore();

        var itemList = this.props.todoList.items;
        var itemKey = itemList.length;
        console.log(itemKey);
        var currItem = {
            "key": itemKey,
            "description": "",
            "due_date": "",
            "assigned_to": "",
            "completed": false
        }
        itemList[itemKey] = currItem;

        fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            items: itemList,
        }).then(() => {
            this.props.history.push('/todolist/' + this.props.todoList.id + '/' + itemKey); // go to new item screen
        });     
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label className="active" htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label className="active" htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
                <div className="card-content grey-text text-darken-3">
                    <div className="list_item_add_card waves-effect waves-light btn" onClick={this.addItem}><i className="material-icons">add_circle_outline</i></div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    todoList.id = id;

    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ListScreen);