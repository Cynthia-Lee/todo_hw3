import React from 'react';
import { Button } from 'react-materialize';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;
        if (item.completed) {
            return (
                <div className="list_item_card card z-depth-0 todo-list-link light-green lighten-4">
                    <div className="card-content grey-text text-darken-3 row">
                        <div className="col s4">
                            <div className="list_item_card_title card-title">{item.description}</div>
                            <div className="card-assigned">Assigned to: {item.assigned_to}</div>
                        </div>
                        <div className="card-due col s3">{item.due_date}</div>
                        <div className="card-completed col s3">
                            <div className='list_item_card_completed'>Completed</div>
                        </div>

                        <div className="col s2">
                            <Button
                                floating
                                fab={{ direction: 'left' }}
                                className="red"
                                large
                            >
                                <Button floating icon={"1"} className="yellow darken-1" />
                                <Button floating icon={"2"} className="green" />
                                <Button floating icon={"3"} className="blue" />
                            </Button>
                        </div>

                    </div>
                </div>
            );
        } else {
            return (
                <div className="list_item_card card z-depth-0 todo-list-link yellow lighten-4">
                    <div className="card-content grey-text text-darken-3 row">
                        <div className="col s4">
                            <div className="list_item_card_title card-title">{item.description}</div>
                            <div className="card-assigned">Assigned to: {item.assigned_to}</div>
                        </div>
                        <div className="card-due col s3">{item.due_date}</div>
                        <div className="card-completed col s3">
                            <div className='list_item_card_not_completed'>Pending</div>
                        </div>

                        <div className="col s2">
                            <Button
                                floating
                                fab={{ direction: 'left' }}
                                className="red"
                                large
                            >
                                <Button floating icon={"1"} className="yellow darken-1" />
                                <Button floating icon={"2"} className="green" />
                                <Button floating icon={"3"} className="blue" />
                            </Button>
                        </div>

                    </div>
                </div>
            );
        }

    }
}
export default ItemCard;