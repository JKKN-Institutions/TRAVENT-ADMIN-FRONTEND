import React from "react";
import "./TableContainer.css";

const TableContainer = ({
  headers,
  rows = [], // default to empty array if rows is undefined or null
  onRowClick,
  selectedRowId,
  actions,
}) => {
  // Check if rows is empty or contains a 'no-data' row
  const isEmpty =
    rows.length === 0 || (rows.length === 1 && rows[0].id === "no-data");

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              {actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td
                  colSpan={headers.length + (actions ? 1 : 0)}
                  className="no-data"
                >
                  {rows.length > 0 && rows[0].data.message
                    ? rows[0].data.message
                    : "No data available"}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr
                  key={row.id || index}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={selectedRowId === row.id ? "selected" : ""}
                >
                  {Object.values(row.data).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                  {actions && (
                    <td>
                      {actions.map(({ icon, onClick }, actionIndex) => (
                        <span
                          key={actionIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            onClick(row);
                          }}
                          className="table-action-icon"
                        >
                          {icon}
                        </span>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableContainer;
