"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var main_1 = require("./components/main");
var favourites_1 = require("./components/favourites");
var catalog_1 = require("./components/catalog");
var catalog_sub_1 = require("./components/catalog-sub");
var catalog_detail_1 = require("./components/catalog-detail");
var accordeon_1 = require("./components/accordeon");
var carousel_1 = require("./components/carousel");
var table_1 = require("./components/table");
var colors_1 = require("./components/colors");
var carousel_cards_1 = require("./components/carousel-cards");
var popup_login_1 = require("./components/popup-login");
var popup_wrong_1 = require("./components/popup-wrong");
var popup_empty_detail_1 = require("./components/popup-empty-detail");
var login_1 = require("./forms/login");
var img_onload_directive_1 = require("./directives/img-onload.directive");
var check_input_state_directive_1 = require("./directives/check-input-state.directive");
var validator_directive_1 = require("./directives/validator.directive");
var appRoutes = [
    { path: '', component: main_1.MainpageComponent },
    { path: 'favourites', component: favourites_1.FavouritesComponent },
    { path: 'catalog', component: catalog_1.CatalogComponent },
    { path: 'catalog/:category', component: catalog_sub_1.CatalogSubComponent },
    { path: 'catalog/:category/:id', component: catalog_detail_1.CatalogDetailComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(appRoutes),
            http_1.HttpModule,
            forms_1.FormsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            favourites_1.FavouritesComponent,
            main_1.MainpageComponent,
            catalog_1.CatalogComponent,
            catalog_sub_1.CatalogSubComponent,
            catalog_detail_1.CatalogDetailComponent,
            accordeon_1.AccordeonComponent,
            carousel_1.CarouselComponent,
            carousel_cards_1.CarouselCardsComponent,
            table_1.TableComponent,
            colors_1.ColorsComponent,
            popup_login_1.PopupLoginComponent,
            popup_wrong_1.PopupWrongComponent,
            popup_empty_detail_1.PopupEmptyDetailComponent,
            login_1.LoginComponent,
            img_onload_directive_1.ImgOnloadDirective,
            check_input_state_directive_1.CheckInputStateDirective,
            validator_directive_1.ValidatorDirective
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map