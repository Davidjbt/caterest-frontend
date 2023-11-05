import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserLoginDto} from "../interface/user-login-dto";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {UserRegisterDto} from "../interface/user-register-dto";
import {AuthenticatedUser} from "../interface/authenticated-user";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: String = 'http://localhost:8080/api/v1/auth'
  private loggedInSubject: BehaviorSubject<AuthenticatedUser | null> = new BehaviorSubject<AuthenticatedUser | null>(null);
  private checkTokenExpirationInterval: any = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService) {

    let user = sessionStorage.getItem('user');

    if (user) {
      this.loggedInSubject.next(<AuthenticatedUser>JSON.parse(user));
      if (this.loggedInSubject) {
        this.checkTokenExpirationInterval = setInterval(
          () => this.checkTokenExpiration(),
          2000);
      }
    }

    console.log(this.loggedInSubject);
  }

  isLoggedIn(): Observable<AuthenticatedUser | null> {
    return this.loggedInSubject.asObservable();
  }

  login(userLoginDto: UserLoginDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, userLoginDto, {
      withCredentials: true
    }).pipe(
      tap(response => {
        this.loggedInSubject.next(response);
        sessionStorage.setItem('user', JSON.stringify(response));
        this.checkTokenExpirationInterval = setInterval(() => this.checkTokenExpiration(), 2000);
      }),
      catchError(error => {
        this.loggedInSubject.next(null);
        throw error;
      })
    );
  }

  register(userRegisterDto: UserRegisterDto, profilePicture: File | null): Observable<any> {
    const formData = new FormData();

    const userPart = new Blob([JSON.stringify(userRegisterDto)], {
      type: 'application/json',
    });
    formData.append('user', userPart);

    if (profilePicture != null)
      formData.append('inpFile', profilePicture);
    console.log(formData);

    return this.http.post<any>(`${this.apiUrl}/register`, formData, {withCredentials: true})
      .pipe(
        tap(response => {
          this.loggedInSubject.next(response);
          sessionStorage.setItem('user', JSON.stringify(response));
          this.checkTokenExpirationInterval = setInterval(() => this.checkTokenExpiration(), 2000);
        })
      )
  }

  logOut(): Observable<any> {
    console.log('now here')
    this.loggedInSubject.next(null);
    this.cookieService.delete('token-expiration');
    clearInterval(this.checkTokenExpirationInterval);
    sessionStorage.removeItem('user');
    return this.http.post<any>(`${this.apiUrl}/logOut`, null, {withCredentials: true})
  }

  logOutBySessionExpired() {
    console.log('here')
    this.loggedInSubject.next(null);
    this.cookieService.delete('token-expiration');
    clearInterval(this.checkTokenExpirationInterval);
    sessionStorage.removeItem('user');
  }

  private checkTokenExpiration() {
    const expirationCookie = this.cookieService.get('token-expiration');
     // console.log('Checking+', expirationCookie, '+');
    if (expirationCookie) {
      const expirationTime = Number(expirationCookie);
      const currentTime = Date.now();
      if (currentTime >= expirationTime) {
        console.log('Expired')
        this.logOutBySessionExpired();
      }
    }

  }

}
