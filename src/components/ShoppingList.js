import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Fetch items when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, []);

  // Update item state when category is changed
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // Add a new item to the list and the backend
  function handleAddItem(newItem) {
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((r) => r.json())
      .then((data) => {
        setItems([...items, data]); // Add the newly added item to the state
      });
  }

  // Update an existing item in the list and on the backend
  function handleUpdateItem(updatedItem) {
    fetch(`http://localhost:4000/items/${updatedItem.id}`, {
      method: "PATCH", // Use "PUT" if necessary
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((r) => r.json())
      .then(() => {
        const updatedItems = items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
        setItems(updatedItems);
      });
  }

  // Delete an item from the list and the backend
  function handleDeleteItem(deletedItem) {
    fetch(`http://localhost:4000/items/${deletedItem.id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedItems = items.filter((item) => item.id !== deletedItem.id);
      setItems(updatedItems);
    });
  }

  // Filter items based on selected category
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      {/* Add Item Form */}
      <ItemForm onAddItem={handleAddItem} />
      
      {/* Category Filter */}
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* List of items */}
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
