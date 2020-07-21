/*
import { Injectable } from '@angular/core';
import { Promotion } from '../menu/shared/promotion';
import { PROMOTIONS } from '../menu/shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }

  getPromotion(id: string): Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  }
}

import { Injectable } from '@angular/core';
import { Promotion } from '../menu/shared/promotion';
import { PROMOTIONS } from '../menu/shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions():  Promise<Promotion[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS), 2000 );
    });

  }

  getPromotion(id: string):  Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    });

  }

  getFeaturedPromotion():  Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    });

  }
}*/
/*
import { Injectable } from '@angular/core';
import { Promotion } from '../menu/shared/promotion';
import { PROMOTIONS } from '../menu/shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions():  Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string):  Observable<Promotion> {
    return of (PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion():  Observable<Promotion> {
    return of (PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  }
}*/
import { Injectable } from '@angular/core';
import { Promotion } from '../menu/shared/promotion';
import { PROMOTIONS } from '../menu/shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../menu/shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private ProcessHttpmsgService: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

}