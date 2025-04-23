import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  // Handle "Add to Cart" / "Remove From Cart" toggle
  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,  // Toggle the `isInCart` status
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));  // Pass the updated item back
  }

  // Handle "Delete" item
  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",  // Send DELETE request to remove the item
    })
      .then(() => onDeleteItem(item));  // Remove the item from the list in the parent component
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      
      {/* Button for Add/Remove from Cart */}
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      
      {/* Button for Deleting Item */}
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
