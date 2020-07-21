/*
import { Injectable } from '@angular/core';
import { Dish } from '../menu/shared/dish';
import { DISHES } from '../menu/shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHES;
  }

  getDish(id: string): Dish {
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
}*/
/*
import { Injectable } from '@angular/core';
import { Dish } from '../menu/shared/dish';
import { DISHES } from '../menu/shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise (resolve => {
      // simulate server latency with 2 sec delay
      setTimeout(() => resolve(DISHES),2000);
    });
  }

  getDish(id: string): Promise<Dish> {
    return new Promise (resolve => {
      // simulate server latency with 2 sec delay
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    });

  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise (resolve => {
      // simulate server latency with 2 sec delay
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });

  }
}*/
/*
import { Injectable } from '@angular/core';
import { Dish } from '../menu/shared/dish';
import { DISHES } from '../menu/shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay( 2000));

  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
}*/

import { Injectable } from '@angular/core';
import { Dish } from '../menu/shared/dish';
import { DISHES } from '../menu/shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../menu/shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private ProcessHttpmsgService: ProcessHttpmsgService ) {

  }


  getDishes(): Observable<Dish[]> {
    //return of(DISHES).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay( 2000));
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true') // si quiere quitar el error entonces solo arreglar dishees a dishes o para poner el error poner dishees
      .pipe( map(dishes => dishes[0]))
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    //return of(DISHES.map(dish => dish.id));
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }
}