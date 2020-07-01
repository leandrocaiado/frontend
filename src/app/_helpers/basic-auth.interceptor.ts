import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService} from 'app/_services/api.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private apiService: ApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
     //
       // const currentUser = this.authenticationService.currentUserValue;
    //    const currentUser='Basic dmE6ZDQxZDhjZDk4ZjAwYjIwNGU5ODAwOTk4ZWNmODQyN2V3d29wQGZkJCYtQGVya2NuYWRhMTk4OXo=';
   

        return next.handle(request);
    }
}