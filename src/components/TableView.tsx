import React from "react";
import { ViewProps } from "../types/ViewProps";

const TableView: React.FC<ViewProps> = ({ countries }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Official Name</th>
          <th>Capital</th>
          <th>Region</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country, index) => (
          <tr key={index}>
            <td>{country.name.common}</td>
            <td>{country.name.official}</td>
            <td>{country.capital.join(", ")}</td>
            <td>{country.region}</td>
            <td>{country.population}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
