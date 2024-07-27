import { Category } from 'src/app/components/models/Category';
import { Difficulty } from './Difficulty';
import { User } from '@auth0/auth0-angular';

export class Recipe {
	public id?: number;
	public name?: string;
	public timeToCookInMinutes?: number;
	public forNumberOfPeople?: number;
	public dateAdded?: Date;
	public user?: User
	public difficulty?: Difficulty;
	public category?: string;
	public instructions?: string;
	public baseImage?: string;
	public userName?: string;
	public cat?: Category;
}
