import React, { useState } from "react";

function App() {
  const [togets, setTogets] = useState([]);
  const [toget, setToget] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setTogets([...togets, toget]);
    setToget("");
  }
  function handleDelete(item) {
    setTogets(togets.filter((toget) => toget !== item));
  }
  function handleClear() {
    setTogets([]);
  }
  if (length.togets > 0) {
    alert("Items  added");
  }

  return (
    <div className="header">
      <h3>grocery bud</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={toget}
          onChange={(e) => setToget(e.target.value)}
          placeholder="Enter items to get..."
        />
        <button type="submit">ADD</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {togets.map((item, index) => {
          console.log(item);

          return (
            <section key={index}>
              <div>
                <span>{item}</span>
                <span>
                  <button onClick={() => handleDelete(item)}>x</button>
                </span>
              </div>
              <hr />
            </section>
          );
        })}
        <div>
          <p style={{ cursor: "pointer" }} onClick={handleClear}>
            Clear items
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
