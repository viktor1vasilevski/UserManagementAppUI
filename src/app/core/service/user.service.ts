import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://localhost:44395/api';

  private userIsEditedSource = new BehaviorSubject<boolean>(false);
  userIsEdited$ = this.userIsEditedSource.asObservable();

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

  getUserById(id: string): Observable<any> {
    const url = `${this.baseUrl}/user/${id}`;
    return this._dataApiService.getById<any>(url);
  }

  editSubcategory(id: string, request: any): Observable<any> {
    return this._dataApiService.put<any, any>(
      `${this.baseUrl}/user/${id}`,
      request
    );
  }

  notifyUserIsEdited() {
    this.userIsEditedSource.next(true);
  }
}
