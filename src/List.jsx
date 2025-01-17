import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function List({ list, removeItem, editItem }) {
  // function removeItem(item) {
  //   setList(list.filter((name) => name !== item));
  // }
  return (
    <div className="grocery-list">
      {list.map((item) => {
        const { id, title, dob } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
           
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                onClick={() => removeItem(title)}
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
