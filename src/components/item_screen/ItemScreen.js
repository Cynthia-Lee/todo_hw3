import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { conditionalExpression } from '@babel/types';

class ItemScreen extends Component {

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        // console.log(target.value);
        var currentDate = new Date();
        var timestamp = currentDate.getTime();
        // update the store
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({
            [target.id]: target.value,
            time: timestamp
        });
    }

    render() {
        const todoList = this.props.todoList;
        const { item } = this.props;

        return (
            <div id="todo_item" className="container white">
                <h5 id="item_heading" className="grey-text text-darken-3">Item</h5>
                <div>
                    Description
                    Assigned To
                    Due Date
                    Completed
                </div>

                <div className="input-field">
                    <label className="active">Description</label>
                    <input className="active" type="text" name="description" id="description" onChange={this.handleChange} value={item.description} />
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
    
    const {itemId} = ownProps.match.params;
    const item = todoList.items[itemId];
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