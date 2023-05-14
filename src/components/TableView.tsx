import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Country } from '../types/Country';

interface TableViewProps {
  countries: Country[];
  onEdit: (country: Country) => void;
  onDelete: (country: Country) => void;
}

const TableView: React.FC<TableViewProps> = ({ countries, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          {/* Outras colunas da tabela */}
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {countries.map((country) => (
          <TableRow key={country.id}>
            <TableCell>{country.name.common}</TableCell>
            {/* Outras células da tabela */}
            <TableCell>
              <Button variant="contained" onClick={() => onEdit(country)}>
                Editar
              </Button>
              <Button variant="contained" onClick={() => onDelete(country)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableView;