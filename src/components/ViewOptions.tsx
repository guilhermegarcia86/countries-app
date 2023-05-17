
import React from 'react';
import { Box, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { styled } from "@mui/system";

const StyledViewOptionsSection = styled(Box)`
  margin-bottom: 16px;
  margin-top: 20px;
  margin-left: 12px;
`;

interface ViewOptionsProps {
  viewOption: 'cards' | 'table';
  onViewOptionChange: (option: 'cards' | 'table') => void;
}

const ViewOptions: React.FC<ViewOptionsProps> = ({ viewOption, onViewOptionChange }) => {
  return (
    <StyledViewOptionsSection marginTop={2}>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="viewOptions"
          name="viewOptions"
          value={viewOption}
          onChange={(e) => onViewOptionChange(e.target.value as 'cards' | 'table')}
          row
        >
          <FormControlLabel
            value="cards"
            control={<Radio />}
            label="Cards"
          />
          <FormControlLabel
            value="table"
            control={<Radio />}
            label="Tabela"
          />
        </RadioGroup>
      </FormControl>
    </StyledViewOptionsSection>
  );
};

export default ViewOptions;