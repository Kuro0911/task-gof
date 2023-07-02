import React, { useState } from "react";
import "./App.css";
import { Table } from "./components/Table/Table";

function App() {
  const fs = window.require("fs");
  const os = window.require("os");
  const path = window.require("path");
  const [json, setJson] = useState(`{
    "product_id": 654321,
    "title": "Product A",
    "price": "15000.00",
    "sku": "1307A 0101000"
  }`);
  const [error, setError] = useState(false);
  const [finalPath, setFinalpath] = useState("");
  const [tableData, setTableData] = useState([]);
  function handleChange(e) {
    setJson(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(json);
      setTableData(parsedData);
      setError(false);
      const dest = path.join(os.homedir(), "jsonvisualized");
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.writeFileSync(path.join(dest, "new_json"), json);
      setFinalpath(path.join(path.join(dest, "new_json")));
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="App">
      <h1>Json File Visualiszer</h1>
      <div className="json-input-wrap">
        <div className="json-input-container">
          <textarea
            value={json}
            onChange={handleChange}
            rows={10}
            cols={50}
            placeholder="Enter JSON data here"
            className="json-input"
          />
        </div>
        <div className="json-submit">
          <button className="json-submit-button" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      <div className="json-out">
        <h1>Json File Output</h1>

        <Table tableData={tableData} error={error} />
        {!error ? <h1>File Location: {finalPath}</h1> : <></>}
      </div>
    </div>
  );
}

export default App;
