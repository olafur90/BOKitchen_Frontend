import { Category } from 'src/app/components/models/Category';
import { Difficulty } from './Difficulty';

export class Recipe {
	public id?: number;
	public name?: string;
	public dateAdded?: Date;
	public forNumberOfPeople?: number;
	public instructions?: string;
	public timeToCookInMinutes?: number;
	public userName?: string;
	public baseImage?: string;
	public category?: string;
	public difficulty?: Difficulty;
	public cat?: Category;
}
