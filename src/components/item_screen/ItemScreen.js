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
        const auth = this.props.auth;
        const todoList = this.props.todoList;

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Item</h5>
                <div>
                    Description
                    Assigned To
                    Due Date
                    Completed
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  // todoList.id = id;

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
)(ItemScreen);