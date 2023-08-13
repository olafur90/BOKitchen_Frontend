import { Category } from "src/app/components/models/Category";

export class Recipe {
    public id?: number;
    public name?: string;
    public dateAdded?: Date;
    public description?: string;
    public forNumberOfPeople?: number;
    public instructions?: string;
    public timeToCookInMinutes?: number;
    public userName?: string;
    public shortDescription?: string;
    public baseImage?: string;
    public categories?: Category[] = [];
    public difficulty?: string;
}