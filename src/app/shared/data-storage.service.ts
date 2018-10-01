import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  FDB_LINK = 'https://udemy-ng-http-b7637.firebaseio.com';

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put(
      `${this.FDB_LINK}/recipes.json?auth=${token}`,
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http
      .get(`${this.FDB_LINK}/recipes.json?auth=${token}`)
      .subscribe((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        this.recipeService.setRecipes(recipes);
      });
  }
}
