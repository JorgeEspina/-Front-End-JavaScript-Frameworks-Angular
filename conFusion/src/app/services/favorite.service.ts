import { Injectable } from '@angular/core';
import { Favorite } from '../menu/shared/favorite';
import { FavoriteExists } from '../menu/shared/favoriteExists';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../menu/shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient,
    public auth: AuthService,
    private ProcessHttpmsgService: ProcessHttpmsgService) { }

  getFavorites(): Observable<Favorite> {
    if (!this.auth.isLoggedIn()) {
      return null;
    }
    return this.http.get<Favorite>(baseURL + 'favorites')
      .pipe(catchError(error => this.ProcessHttpmsgService.handleError(error)));
  }

  postFavorites(dishids: any) {
    return this.http.post(baseURL + 'favorites/', dishids)
    .pipe(catchError(error => this.ProcessHttpmsgService.handleError(error)));
  }

  isFavorite(id: string): Observable<FavoriteExists> {
    if (!this.auth.isLoggedIn()) {
      return of({ exists: false, favorites: null });
    }
    return this.http.get<FavoriteExists>(baseURL + 'favorites/' + id)
    .pipe(catchError(error => this.ProcessHttpmsgService.handleError(error)));
  }

  postFavorite(id: string) {
    return this.http.post(baseURL + 'favorites/' + id, {})
    .pipe(catchError(error => this.ProcessHttpmsgService.handleError(error)));
  }

  deleteFavorite(id: string) {
    return this.http.delete(baseURL + 'favorites/' + id)
    .pipe(catchError(error => this.ProcessHttpmsgService.handleError(error)));
  }
}