/*
Intially Based on Angular2 Tour of Heroes by John Papa @ https://github.com/johnpapa/angular2-tour-of-heroes
 ----
 An attempt to comply with Apache License
 Changes:
    1. Removed entirety of ToH code
 */

import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {MusicCreateComponent} from "./music-create.component";

@RouteConfig([
    {
        path: "/music/:name",
        name: "SheetMusic",
        component: MusicCreateComponent
    }
])
@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES], //This tells angular what components we want access to.
    providers: [ROUTER_PROVIDERS], //This tells the injector what services we are looking to use
    template: `<h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['SheetMusic', {name: 'none'}]">Sheet Music Creator</a>
        </nav>
        <router-outlet></router-outlet>
        `,
    styleUrls: ['app/app.component.css']
})
export class AppComponent implements OnInit{
    ngOnInit():any {
        return undefined;
    }
    constructor(){
    }
    public title = "Angular 2 Test Site - Mark Todd";
}
