import React from 'react';
import './ExpenseItem.css';

export default function ExpenseItem(props) {
    const item = `${props.Item} ${props.Price}$`;

    return (
        <div className="expense-item">
            <div className="item">{item}</div>
            <button onClick={props.onDelete}>Delete</button> {/* Add a delete button */}
        </div>
    );
}
