import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FactoryModalService {
    container: ViewContainerRef;
}