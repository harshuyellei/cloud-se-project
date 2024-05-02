import React from 'react';
import './InventoryList.css';

function InventoryList({ items, onSelectItem, onDeleteItem }) {
  return (
    <div className="inventory-list">
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item._id} className="inventory-item">
              <div>
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">{item.quantity}</span>
              </div>
              <img src={item.imageUrl} alt={item.name} className="item-image" />
              <button onClick={() => onSelectItem(item)} className="update-button">Update</button>
              <button onClick={() => onDeleteItem(item)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in inventory.</p>
      )}
    </div>
  );
}

export default InventoryList;
