import React from "react";
import { ChangeEvent } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  background-color: #f44336;
  color: #fff;
`;

const StyledSelect = styled(Select)`
  margin-bottom: 16px;
`;

interface FilterSectionProps {
  nameFilter: string;
  independentFilter: boolean | null;
  onNameFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIndependentFilterChange: (event: ChangeEvent<{ value: unknown }>) => void;
  onFilterButtonClick: () => void;
  onClearButtonClick: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  nameFilter,
  independentFilter,
  onNameFilterChange,
  onIndependentFilterChange,
  onFilterButtonClick,
  onClearButtonClick
}) => {

  return (
    <div>
      <h2>Filtros</h2>
      <div>
        <StyledTextField
          label="Nome"
          value={nameFilter}
          onChange={onNameFilterChange}
        />
      </div>
      <div>
        <StyledSelect
          label="Independente"
          value={independentFilter || ""}
          onChange={
            onIndependentFilterChange as (
              event: SelectChangeEvent<unknown>
            ) => void
          }
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="true">Ativo</MenuItem>
          <MenuItem value="false">Inativo</MenuItem>
        </StyledSelect>
      </div>
      <div>
        <StyledButton variant="contained" onClick={onFilterButtonClick}>
          Consultar
        </StyledButton>
        <StyledButton variant="contained" onClick={onClearButtonClick}>
          Limpar
        </StyledButton>
      </div>
    </div>
  );
};

export default FilterSection;
