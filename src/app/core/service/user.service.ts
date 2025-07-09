import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { HttpParams } from '@angular/common/http';
import { UserRequest } from '../models/user/user-request.model';
import { ApiResponse } from '../models/api-response.model';
import { UserDetailsDto } from '../models/user/user-details-dto.model';
import { UserDto } from '../models/user/user-dto.model';
import { EditUserRequest } from '../models/user/edit-user-request.model';
import { environment } from '../../../enviroments/environment';
import { ApiEndpoints } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private _dataApiService: DataService) {}

  getUsers(request: UserRequest): Observable<ApiResponse<UserDetailsDto[]>> {
    const params = new HttpParams()
      .set('username', request.username)
      .set('skip', request.skip.toString())
      .set('take', request.take.toString());

    const url = `${this.baseUrl}/${ApiEndpoints.User.Base}`;
    return this._dataApiService.getAll<ApiResponse<UserDetailsDto[]>>(
      url,
      params
    );
  }

  deleteUser(id: string): Observable<ApiResponse<string>> {
    const url = `${this.baseUrl}/${ApiEndpoints.User.ById(id)}`;
    return this._dataApiService.delete<ApiResponse<string>>(url);
  }

  getUserById(id: string): Observable<ApiResponse<UserDto>> {
    const url = `${this.baseUrl}/${ApiEndpoints.User.ById(id)}`;
    return this._dataApiService.getById<ApiResponse<UserDto>>(url);
  }

  editSubcategory(
    id: string,
    request: EditUserRequest
  ): Observable<ApiResponse<UserDetailsDto>> {
    return this._dataApiService.put<
      EditUserRequest,
      ApiResponse<UserDetailsDto>
    >(`${this.baseUrl}/${ApiEndpoints.User.ById(id)}`, request);
  }
}
