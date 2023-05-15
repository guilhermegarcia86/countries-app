import React from "react";
import { Card, CardContent, CardMedia, CardActions, Typography, Button, Box } from "@mui/material";
import { styled } from '@mui/system';
import { Country } from "../types/Country";
import Grid from '@mui/material/Grid';

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  background-color: #f5f5f5;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 200px;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: center;
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
    <Grid container spacing={2}>
      {countries.map((country) => (
        <Grid item xs={12} sm={6} md={4} key={country.id}>
          <StyledCard>
            <StyledCardContent>
              <StyledCardMedia>
                <img src={country.flags.png} alt={country.name.common} />
              </StyledCardMedia>
              <Typography variant="h5" component="div" align="center">
                {country.name.common}
              </Typography>
            </StyledCardContent>
            <StyledCardActions>
              <Button variant="contained" onClick={() => onEdit(country)}>
                Editar
              </Button>
              <Button variant="contained" onClick={() => onDelete(country)}>
                Excluir
              </Button>
            </StyledCardActions>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardsView;

