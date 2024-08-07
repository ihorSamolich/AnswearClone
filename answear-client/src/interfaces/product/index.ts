import { IShortCategory } from "interfaces/category";

export interface IProductPhoto {
    id: number;
    name: string;
    priority: number;
}

export interface IProductVariation {
    id: number;
    slug: string;
    shortDescription: string;
    price: number;
    discountValueId: number | null;
    discountValue: number | null;
    photos: IProductPhoto[];
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    category: IShortCategory;
    slug: string | null;
    variations: IProductVariation[];
}

export interface IProductCreate {
    name: string;
    description: string;
    categoryId: number;
    variations?: IProductCreateVariation[];
    filters?: number[];
}

export interface IProductCreateVariation {
    shortDescription: string;
    price: number;
    discountValueId?: string;
    photos?: File[];
}
