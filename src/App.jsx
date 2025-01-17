import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      // display alert

      showAlert(true, "danger", "Please enter a valid name");
    } else if (name && isEditing) {
      //deal with edit
      setList(
        list.map((item) => {
          if (item.id == editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");

      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    }
    if (name && date) {
      // show alert
      showAlert(true, "success", "Item added to list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  }
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  function clearList() {
    showAlert(true, "danger", "empty list");
    setList([]);
  }

  function removeItem(title) {
    showAlert(true, "danger", "item removed");
    setList(list.filter((list) => list.title !== title));
  }

  function editItem(id) {
    const specificItem = list.find((item) => item.id == id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
    setDate(specificItem.dob);
  }
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert list={list} {...alert} removeAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <div>
            <input
              type="text"
              className="grocery"
              placeholder="e.g: eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            list={list}
            setList={setList}
            removeItem={removeItem}
            editItem={editItem}
          />
          <button onClick={clearList} className="clear-btn">
            Clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
