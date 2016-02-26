/*
Intially Based on Angular2 Tour of Heroes by John Papa @ https://github.com/johnpapa/angular2-tour-of-heroes
 ----
 An attempt to comply with Apache License
 Changes:
    1. Removed entirety of ToH code
 */
System.register(['angular2/core', 'angular2/router', "./music-create.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, music_create_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (music_create_component_1_1) {
                music_create_component_1 = music_create_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = "Angular 2 Test Site - Mark Todd";
                }
                AppComponent.prototype.ngOnInit = function () {
                    return undefined;
                };
                AppComponent = __decorate([
                    router_1.RouteConfig([
                        {
                            path: "/music/:name",
                            name: "SheetMusic",
                            component: music_create_component_1.MusicCreateComponent
                        }
                    ]),
                    core_1.Component({
                        selector: 'my-app',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [router_1.ROUTER_PROVIDERS],
                        template: "<h1>{{title}}</h1>\n        <nav>\n            <a [routerLink]=\"['SheetMusic', {name: 'none'}]\">Sheet Music Creator</a>\n        </nav>\n        <router-outlet></router-outlet>\n        ",
                        styleUrls: ['app/app.component.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map