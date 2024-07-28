import { IShortCategory } from "interfaces/category";

export interface IFilterValue {
    id: number;
    name: string;
}

export interface IFilter {
    id: number;
    name: string;
    categoryId: number;
    category: IShortCategory;
    filterValues: IFilterValue[];
}

export interface ICreateFilter {
    name: string;
    categoryId: number;
    values: string[];
}

export interface IUpdateFilter {
    id: string;
    name: string;
    categoryId: number;
    values: string[];
}
