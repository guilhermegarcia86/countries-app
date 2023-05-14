import axios, { AxiosResponse } from 'axios';
import { CountriesResponse } from '../types/CountriesResponse';
import { Country } from '../types/Country';

export const fetchCountries = async (
    nameFilter: string,
    independentFilter: boolean | null,
    page: number,
    limit: number
): Promise<CountriesResponse> => {
    try {
        const queryParams = getCountryQueryParams(nameFilter, independentFilter, page, limit);
        const response: AxiosResponse<Country[]> = await axios.get(`http://localhost:8080/countries${queryParams}`);
        const { data, headers } = response;
        const totalCountHeader = headers['x-total-count'];
        const totalCount = parseInt(totalCountHeader, 10);
        return {
            data,
            totalCount
        };
    } catch (error) {
        console.error('Error fetching countries:', error);
        return {} as CountriesResponse;
    }
};

const getCountryQueryParams = (
    nameFilter: string,
    independentFilter: boolean | null,
    page: number,
    limit: number
): string => {
    const queryParams = [];

    if (nameFilter) {
        queryParams.push(`name.common=${encodeURIComponent(nameFilter)}`);
    }

    if (independentFilter !== null) {
        queryParams.push(`independent=${independentFilter}`);
    }

    queryParams.push(`_page=${page}`);
    queryParams.push(`_limit=${limit}`);

    return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
};

export const editCountry = async (id: number, country: Country) => {
    await axios.put(`http://localhost:8080/countries/${id}`, country);
};

export const deleteCountry = async (id: number) => {
    await axios.delete(`http://localhost:8080/countries/${id}`);
};