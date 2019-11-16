import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {

    handleNewList = () => {
        // adding new list to the firestore
        const fireStore = getFirestore();

        // new Date().getTime();
        var currentDate = new Date();
        var timestamp = currentDate.getTime();
        // console.log(timestamp);

        fireStore.collection('todoLists').add({
            name: "",
            owner: "",
            items: [],
            time: timestamp
        }).then(ref => {
            this.props.history.push('/todolist/' + ref.id); // go to new list screen
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>

                        <div className="home_new_list_container">
                            <button className="home_new_list_button" onClick={this.handleNewList}>
                                Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists', orderBy: ['time', 'desc'] },
    ]),
)(HomeScreen);