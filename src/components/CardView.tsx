import React from 'react';
import { ViewProps } from '../types/ViewProps';

const CardsView: React.FC<ViewProps> = ({ countries }) => {
  return (
    <div>
      {countries.map((country, index) => (
        <div key={index}>
          <img src={country.flags.png} alt={country.flags.alt} />
          <p>{country.name.common}</p>
        </div>
      ))}
    </div>
  );
};

export default CardsView;
