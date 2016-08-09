"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var application_service_1 = require('../application.component/application.service');
var router_1 = require('@angular/router');
var DogDetailsComponent = (function () {
    function DogDetailsComponent(applicationService, route) {
        this.applicationService = applicationService;
        this.route = route;
    }
    // Load data ones componet is ready
    DogDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to route params
        this.sub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            // Retrieve Pet with Id route param
            _this.applicationService.findPetById(id).subscribe(function (dog) { return _this.dog = dog; });
        });
    };
    DogDetailsComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    };
    DogDetailsComponent = __decorate([
        core_1.Component({
            template: "\n    <div *ngIf=\"dog\">\n        <h2>{{dog.name.$t}}</h2>\n        <img src=\"{{dog.media.photos.photo[3].$t}}\"/>\n        <p><strong>Age: </strong>{{dog.age.$t}}</p>\n        <p><strong>Sex: </strong>{{dog.sex.$t}}</p>\n        <p><strong>Description: </strong>{{dog.description.$t}}</p>\n    </div>\n    ",
            // Providers
            providers: [application_service_1.ApplicationService],
            // Directives
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [application_service_1.ApplicationService, router_1.ActivatedRoute])
    ], DogDetailsComponent);
    return DogDetailsComponent;
}());
exports.DogDetailsComponent = DogDetailsComponent;
//# sourceMappingURL=dog-details.component.js.map