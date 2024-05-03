import React, { useState, useEffect } from 'react';
import './InventoryForm.css';

function InventoryForm({ item, onUpdateList, clearItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
    } else {
      setName('');
      setQuantity('');
      setImage(null);
    }
  }, [item]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let body;
    const headers = {};
    if (item) {
        // Send JSON for updates
        body = JSON.stringify({ name, quantity });
        headers['Content-Type'] = 'application/json';
    } else {
        // Use FormData for new item creation
        const formData = new FormData();
        formData.append('name', name);
        formData.append('quantity', quantity);
        if (image) {
            formData.append('image', image);
        }
        body = formData;
    }

    const url = item ? `http://ec2-34-207-208-240.compute-1.amazonaws.com:5000/api/inventory/${item._id}` : 'http://ec2-34-207-208-240.compute-1.amazonaws.com:5000/api/inventory';
    const method = item ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      body,
      headers
    });

    const newItem = await response.json();
    onUpdateList(newItem, !item); // Pass boolean to indicate add or update
    clearItem(); // Clear form after submission
    setLoading(false);
};


  return (
    <form onSubmit={handleSubmit} className="inventory-form">
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
      </label>
      {!item && ( // Only show the image upload for new items
        <label>
          Image:
          <input type="file" onChange={e => setImage(e.target.files[0])} />
        </label>
      )}
      <button type="submit" disabled={loading}>
        {item ? 'Update' : 'Add'} Item
      </button>
      {item && (
        <button type="button" onClick={() => clearItem()} disabled={loading}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default InventoryForm;
