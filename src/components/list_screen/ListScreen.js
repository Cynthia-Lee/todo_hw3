import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';

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

        var itemList = this.props.todoList.items;
        var itemKey = itemList.length;
        this.props.history.push('/todolist/' + this.props.todoList.id + '/' + itemKey); // go to new item screen

        /*
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
        */
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <div className="list_screen_header row">
                    <div className="list_screen_title grey-text text-darken-3 col">Todo List</div>

                    <Modal className="delete_list_modal" header="Delete List?"
                        actions={
                            <div class="delete_list_modal_footer">
                                <div className="confirm_delete_button modal-close waves-effect waves-light green btn-flat"><i className="material-icons left">check</i>Yes</div>
                                <div className="modal-close waves-effect waves-light red btn-flat"><i className="material-icons left">close</i>No</div>
                            </div>
                        }
                        trigger={<div className="right col" onClick={this.deleteList}><i className="medium material-icons">delete_forever</i></div>
                        } options={{ dismissible: false }}>
                        <div class="delete_list_modal_content">
                            <p>Are you sure you want to delete the list?</p>
                            <p>The list will not be retreivable.</p>
                        </div>
                    </Modal>

                </div>
                <div className="list_input">
                    <div className="input-field">
                        <label className="active" htmlFor="email">Name</label>
                        <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="password">Owner</label>
                        <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                    </div>
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