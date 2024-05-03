import React from 'react';
import InventoryList from './InventoryList';
import InventoryForm from './InventoryForm';
import './InventoryPage.css';

class InventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: null,
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = async () => {
    const response = await fetch('http://ec2-34-207-208-240.compute-1.amazonaws.com:5000/api/inventory');
    const items = await response.json();
    this.setState({ items });
  };

  handleSelectItem = (item) => {
    this.setState({ currentItem: item });
  };

  handleUpdateList = (newItem, isAddition) => {
    let updatedItems = this.state.items.slice(); // Clone the current items array
    if (isAddition) {
        updatedItems.push(newItem); // Add new item
    } else {
        updatedItems = updatedItems.map(item => 
            item._id === newItem._id ? newItem : item
        ); // Replace the updated item
    }
    this.setState({ items: updatedItems });
    this.clearCurrentItem(); // Clear the current item
};
    
  handleDeleteItem = async (item) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const url = `http://ec2-34-207-208-240.compute-1.amazonaws.com:5000/api/inventory/${item._id}`;
      const response = await fetch(url, { method: 'DELETE' });
      if (response.ok) { // Only update state if the server responds with a success status
        const updatedItems = this.state.items.filter(i => i._id !== item._id);
        this.setState({ items: updatedItems });
      }
    }
  };
  
  clearCurrentItem = () => {
    this.setState({ currentItem: null });
  };

  render() {
    const { items, currentItem } = this.state;
    return (
      <div className="inventory-page">
        <h1>Inventory Management</h1>
        <InventoryForm item={currentItem} onUpdateList={this.handleUpdateList} clearItem={this.clearCurrentItem} />
        <InventoryList items={items} onSelectItem={this.handleSelectItem} onDeleteItem={this.handleDeleteItem} />
      </div>
    );
  }
}

export default InventoryPage;
