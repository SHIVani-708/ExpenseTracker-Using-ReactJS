import React from 'react';

export default function ExpenseItem(props) {
    const item = `${props.Item} ${props.Price}$`;

    return (
        <div className="expense-item">
            {item}
            <button onClick={props.onDelete}>Delete</button> {/* Add a delete button */}
        </div>
    );
}
