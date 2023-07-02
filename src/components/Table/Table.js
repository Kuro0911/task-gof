import React from "react";
import "./Table.css";
export const Table = ({ tableData, error }) => {
  if (tableData.length === 0 || error) {
    return (
      <h1 style={{ color: "crimson", fontFamily: "monospace" }}>
        * Invalid Json *
      </h1>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(tableData).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.values(tableData).map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
