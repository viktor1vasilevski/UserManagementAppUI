import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginRequest } from '../models/auth/user-login-request.model';
import { UserLoginDTO } from '../models/auth/user-login-dto.model';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';
import { UserRegisterRequest } from '../models/auth/user-register-request.model';
import { UserRegisterDto } from '../models/auth/user-register-dto.model';
import { environment } from '../../../enviroments/environment';
import { ApiEndpoints } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(request: UserLoginRequest): Observable<ApiResponse<UserLoginDTO>> {
    return this.http.post<ApiResponse<UserLoginDTO>>(
      `${this.baseUrl}/${ApiEndpoints.Auth.Login}`,
      request
    );
  }

  register(
    request: UserRegisterRequest
  ): Observable<ApiResponse<UserRegisterDto>> {
    return this.http.post<ApiResponse<UserRegisterDto>>(
      `${this.baseUrl}/${ApiEndpoints.Auth.Register}`,
      request
    );
  }
}
