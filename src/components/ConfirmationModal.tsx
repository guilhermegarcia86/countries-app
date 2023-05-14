import React from "react";
import { Button, Modal } from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal open={open} onClose={onCancel}>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
