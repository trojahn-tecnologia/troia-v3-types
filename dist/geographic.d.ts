import { BaseApiResponse, PaginatedApiResponse, PaginationQuery } from './common';
export interface CountryResponse {
    id: string;
    name: string;
    englishName: string;
    initials: string;
    ddi: string;
    bacen?: number;
    deletedAt?: Date;
}
export interface StateResponse {
    id: string;
    countryId: string;
    name: string;
    initials: string;
    ibge?: number;
    ddd?: string;
    deletedAt?: Date;
}
export interface CityResponse {
    id: string;
    stateId: string;
    name: string;
    ibge?: number;
    deletedAt?: Date;
}
export interface CreateCountryRequest {
    name: string;
    englishName: string;
    initials: string;
    ddi: string;
    bacen?: number;
}
export interface UpdateCountryRequest {
    name?: string;
    englishName?: string;
    initials?: string;
    ddi?: string;
    bacen?: number;
}
export interface CreateStateRequest {
    countryId: string;
    name: string;
    initials: string;
    ibge?: number;
    ddd?: string;
}
export interface UpdateStateRequest {
    countryId?: string;
    name?: string;
    initials?: string;
    ibge?: number;
    ddd?: string;
}
export interface CreateCityRequest {
    stateId: string;
    name: string;
    ibge?: number;
}
export interface UpdateCityRequest {
    stateId?: string;
    name?: string;
    ibge?: number;
}
export interface GetCountriesQuery extends PaginationQuery {
    initials?: string;
    ddi?: string;
}
export interface GetStatesQuery extends PaginationQuery {
    countryId?: string;
    initials?: string;
    ddd?: string;
}
export interface GetCitiesQuery extends PaginationQuery {
    stateId?: string;
    ibge?: number;
}
export interface CountryApiResponse extends BaseApiResponse<CountryResponse> {
}
export interface CountriesListApiResponse extends PaginatedApiResponse<CountryResponse> {
}
export interface StateApiResponse extends BaseApiResponse<StateResponse> {
}
export interface StatesListApiResponse extends PaginatedApiResponse<StateResponse> {
}
export interface CityApiResponse extends BaseApiResponse<CityResponse> {
}
export interface CitiesListApiResponse extends PaginatedApiResponse<CityResponse> {
}
