import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginRequest } from '../models/auth/user-login-request.model';
import { UserLoginDTO } from '../models/auth/user-login-dto.model';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';
import { UserRegisterRequest } from '../models/auth/user-register-request.model';
import { UserRegisterDto } from '../models/auth/user-register-dto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:44395/api';

  constructor(private http: HttpClient) {}

  login(request: UserLoginRequest): Observable<ApiResponse<UserLoginDTO>> {
    return this.http.post<ApiResponse<UserLoginDTO>>(
      `${this.baseUrl}/auth/login`,
      request
    );
  }

  register(
    request: UserRegisterRequest
  ): Observable<ApiResponse<UserRegisterDto>> {
    return this.http.post<ApiResponse<UserRegisterDto>>(
      `${this.baseUrl}/auth/register`,
      request
    );
  }
}
