import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Country } from '../types/Country';

interface DeleteModalProps {
  country: Country;
  onDelete: (country: Country) => void;
  onClose: () => void;
}

const DeleteCountryModal: React.FC<DeleteModalProps> = ({ country, onDelete, onClose }) => {
  const handleConfirmDelete = () => {
    onDelete(country);
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Excluir País</DialogTitle>
      <DialogContent>
        <p>Deseja realmente excluir o país {country.name.common}?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirmDelete}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCountryModal;
