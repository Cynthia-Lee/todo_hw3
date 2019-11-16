import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <div className="card-title">{item.description}</div>
                    <div className="card-assigned">Assigned to: {item.assigned_to}</div>
                    <div className="card-due">{item.due_date}</div>
                    <div className="card-completed">{item.completed ?
                        <div className='list_item_card_completed'>Completed</div> :
                        <div className='list_item_card_not_completed'>Pending</div>}</div>
                </div>
            </div>
        );
    }
}
export default ItemCard;