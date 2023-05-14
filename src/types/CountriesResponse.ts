import { Country } from "./Country";

export interface CountriesResponse {
    data: Country[];
    totalCount: number;
}