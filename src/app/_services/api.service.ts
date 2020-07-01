import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { EventEmitter } from "@angular/core";
import { environment } from "environments/environment";
import { User }  from "app/_models/user";
import { Router } from "@angular/router";
import { stringify } from "querystring";
import { ResponseModel } from 'app/_models/reponse.model';
import { first } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class ApiService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('currentUser'))
  );
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUser = this.currentUserSubject.asObservable();
  }


  private usuarioAutenticado: boolean = false;
  //private readonly API2 = `${environment.API2}`;

  // mostrarMenuEmitter = new EventEmitter<boolean>();

  private readonly url = `${environment.url}`;

  public get currentUserValue(): User {



    return this.currentUserSubject.value;
  }

  
 

  postFile(fileToUpload: File) {

    const endpoint = 'http://localhost:8080/prevent_backend/api/PREVENT/log/uploadLog';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
 
    return (
      this.http
        .post<any>(endpoint, formData)
    
        .pipe(
          map(user => {
         
            return user;
          })
        )
    );
  }
  

  login(username: string, password: string) {
 
    return (
      this.http
        .post<any>(`http://localhost:8080/prevent_backend/api/PREVENT/autentication/login`, { "email": username, "password": password })
   
        .pipe(
          map(user => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            // user.nome = window.btoa(username + ':' + password);
    
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          })
        )
    );
  }




  esqueceu(email: string) {
 
    return (
      this.http
        .get<any>(`http://localhost:8080/prevent_backend/api/PREVENT/esqueceu/recuperarSenha?email=`+email)
   
        .pipe(
          map(user => {

            return user;
          })
        )
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);

  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }


  pesquisar(data: string, hora: string, ip: string) {
    const queryString = `&data=${encodeURIComponent(data)}`
                      + `&hora=${encodeURIComponent(hora)}`
                      + `&ip=${encodeURIComponent(ip)}` 

  
                      return (
                        this.http
                          .get<any>(`http://localhost:8080/prevent_backend/api/PREVENT/log/pesquisa?${queryString}`)
                     
                          .pipe(
                            map(user => {
                              // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                              // user.nome = window.btoa(username + ':' + password);
                      
                              localStorage.setItem('currentUser', JSON.stringify(user));
                              this.currentUserSubject.next(user);
                              return user;
                            })
                          )
                      );
} 
  
}
