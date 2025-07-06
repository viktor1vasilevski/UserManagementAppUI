import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://localhost:44395/api';

  private userAddedOrEditedSource = new BehaviorSubject<boolean>(false);
  userAddedOrEdited$ = this.userAddedOrEditedSource.asObservable();

  constructor(private _dataApiService: DataService) {}

  getUsers(request: any): Observable<any> {
    const params = new HttpParams()
      .set('username', request.username)
      .set('skip', request.skip.toString())
      .set('take', request.take.toString());

    const url = `${this.baseUrl}/user`;
    return this._dataApiService.getAll<any>(url, params);
  }

  deleteUser(id: string): Observable<any> {
    const url = `${this.baseUrl}/user/${id}`;
    return this._dataApiService.delete<any>(url);
  }
}
