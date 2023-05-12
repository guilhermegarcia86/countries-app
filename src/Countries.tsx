import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      spa: {
        official: string;
        common: string;
      };
    };
  };
  independent: boolean;
  unMember: boolean;
  capital: string[];
  region: string;
  flag: string;
  population: number;
}

const Countries: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [independentFilter, setIndependentFilter] = useState<boolean | null>(null);
  const [viewOption, setViewOption] = useState<'cards' | 'table'>('cards');

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  const handleIndependentFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === 'true' ? true : event.target.value === 'false' ? false : null;
    setIndependentFilter(value);
  };

  const handleViewOptionChange = (option: 'cards' | 'table') => {
    setViewOption(option);
  };

  const fetchCountries = () => {
    const queryParams = getCountryQueryParams();

    axios
      .get(`http://localhost:8080/countries${queryParams}`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  };

  const getCountryQueryParams = (): string => {
    const queryParams = [];

    console.log('nameFilter ', nameFilter)

    if (nameFilter) {
        console.log('entrou')
      queryParams.push(`name.common=${encodeURIComponent(nameFilter)}`);
    }

    if (independentFilter !== null) {
      queryParams.push(`independent=${independentFilter}`);
    }

    return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  };

  const renderCardsView = () => {
    return countries.map((country, index) => (
      <div key={index}>
        <img src={country.flags.png} alt={country.flags.alt} />
        <p>{country.name.common}</p>
      </div>
    ));
  };

  const renderTableView = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Official Name</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={index}>
              <td>{country.name.common}</td>
              <td>{country.name.official}</td>
              <td>{country.capital.join(', ')}</td>
              <td>{country.region}</td>
              <td>{country.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>

      <div>
        <h2>Filtros</h2>
        <div>
          <label>
            Nome:
            <input type="text" value={nameFilter} onChange={handleNameFilterChange} />
          </label>
        </div>
        <div>
          <label>
            Independente:
            <select value={independentFilter === null ? '' : String(independentFilter)} onChange={handleIndependentFilterChange}>
              <option value="">Todos</option>
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </label>
        </div>
        <div>
          <button onClick={fetchCountries}>Consultar</button>
        </div>
      </div>

      <h2>Opções de Visualização</h2>
      <label>
        <input
          type="radio"
          value="cards"
          checked={viewOption === 'cards'}
          onChange={() => handleViewOptionChange('cards')}
        />
        Cards
      </label>
      <label>
        <input
          type="radio"
          value="table"
          checked={viewOption === 'table'}
          onChange={() => handleViewOptionChange('table')}
        />
        Tabela
      </label>

      {viewOption === 'cards' ? renderCardsView() : renderTableView()}
    </div>
  );
};

export default Countries;

