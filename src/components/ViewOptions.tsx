import React from 'react';

interface ViewOptionsProps {
  viewOption: 'cards' | 'table';
  onViewOptionChange: (option: 'cards' | 'table') => void;
}

const ViewOptions: React.FC<ViewOptionsProps> = ({ viewOption, onViewOptionChange }) => {
  return (
    <div>
      <h2>Opções de Visualização</h2>
      <label>
        <input
          type="radio"
          value="cards"
          checked={viewOption === 'cards'}
          onChange={() => onViewOptionChange('cards')}
        />
        Cards
      </label>
      <label>
        <input
          type="radio"
          value="table"
          checked={viewOption === 'table'}
          onChange={() => onViewOptionChange('table')}
        />
        Tabela
      </label>
    </div>
  );
};

export default ViewOptions;
