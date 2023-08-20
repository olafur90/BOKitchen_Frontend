import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { API_URL } from "src/environment/environment";

// Auth service
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _loginUrl = `${API_URL}/login/`;
  constructor(private _http: HttpClient) {}
  // login method
  Login(username: string, password: string): Observable<any> {
    return this._http.post(this._loginUrl, { username, password }).pipe(
      map((response) => {
        // prepare the response to be handled, then return
        // we'll tidy up later
        const retUser: IAuthInfo = <IAuthInfo>(<any>response).data;
        // save in localStorage
        localStorage.setItem('user', JSON.stringify(retUser));
        return retUser;
      })
    );
  }
}

// user model
export interface IUser {
    email: string;
    id: string;
}
  // auth model
export interface IAuthInfo {
    payload?: IUser;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number
}