import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any) {
    return this.http.post<any>(
      `${apiUrls.authServiceAPi}register`,
      registerObj
    );
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceAPi}login`, loginObj);
  }

  sendEmailService(email: string) {
    return this.http.post<any>(`${apiUrls.authServiceAPi}send-email`, {
      email: email,
    });
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(
      `${apiUrls.authServiceAPi}reset-password`,
      resetObj
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('user_Id');
  }
}
