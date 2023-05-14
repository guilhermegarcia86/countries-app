import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { styled } from '@mui/system';
import { Country } from "../types/Country";

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
`;

const StyledCardMedia = styled(CardMedia)`
  width: 100px;
  height: 100px;
`;

interface CardViewProps {
  countries: Country[];
  onEdit: (country: Country) => void;
  onDelete: (country: Country) => void;
}

const CardsView: React.FC<CardViewProps> = ({
  countries,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      {countries.map((country) => (
        <StyledCard key={country.id}>
          <StyledCardContent>
            <StyledCardMedia>
              <img src={country.flags.png} alt={country.name.common} />
            </StyledCardMedia>
            <Typography variant="h5" component="div">
              {country.name.common}
            </Typography>
          </StyledCardContent>
          <CardContent>
            <Button variant="contained" onClick={() => onEdit(country)}>
              Editar
            </Button>
            <Button variant="contained" onClick={() => onDelete(country)}>
              Excluir
            </Button>
          </CardContent>
        </StyledCard>
      ))}
    </>
  );
};

export default CardsView;
