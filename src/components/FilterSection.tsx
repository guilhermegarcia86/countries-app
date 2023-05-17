import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent
} from "@mui/material";
import { styled } from "@mui/system";

const StyledFilterSection = styled(Box)`
  display: flex;
  margin-bottom: 16px;
  margin-top: 20px;
  margin-right: 10px;
  margin-left: 10px;
`;

const StyledForm = styled(Box)`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
`;

const StyledButtons = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

const StyledFormControl = styled(FormControl)`
  width: 200px;
`;

interface FilterSectionProps {
  nameFilter: string;
  independentFilter: string;
  onNameFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIndependentFilterChange: (event: SelectChangeEvent) => void;
  onFilterButtonClick: () => void;
  onClearButtonClick: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  nameFilter,
  independentFilter,
  onNameFilterChange,
  onIndependentFilterChange,
  onFilterButtonClick,
  onClearButtonClick,
}) => {

  return (
    <StyledFilterSection>
      <StyledForm>
        <TextField
          label="Nome"
          variant="standard"
          value={nameFilter}
          onChange={onNameFilterChange}
        />
        <StyledFormControl variant="outlined">
          <InputLabel id="ativo-inativo-label">Ativo/Inativo</InputLabel>
          <Select
            labelId="ativo-inativo-label"
            id="ativo-inativo"
            label="Ativo/Inativo"
            value={independentFilter}
            onChange={onIndependentFilterChange}
          >
            <MenuItem value={''}>Todos</MenuItem>
            <MenuItem value={'true'}>Ativo</MenuItem>
            <MenuItem value={'false'}>Inativo</MenuItem>
          </Select>
        </StyledFormControl>
      </StyledForm>
      <StyledButtons mb={2}>
        <Button
          variant="contained"
          color="primary"
          sx={{ flex: 1, whiteSpace: 'nowrap', mr: 1 }}
          onClick={onFilterButtonClick}
        >
          Consultar
        </Button>
        <Button 
          variant="contained" 
          sx={{ flex: 1, whiteSpace: 'nowrap' }}
          onClick={onClearButtonClick}>
          Limpar
        </Button>
      </StyledButtons>
    </StyledFilterSection>
  );
};

export default FilterSection;
