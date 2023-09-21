import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from "./service/Api/api.service";

import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientJsonpModule} from "@angular/common/http";
import {UserSessionService} from './service/Session/user-session.service';
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {NgxPrintModule} from "ngx-print";

import {LoginComponent} from './components/shared/login/login.component';
import {RegisterComponent} from './components/shared/register/register.component';
import {AuthComponent} from './components/shared/auth/auth.component';
import {UserComponent} from './components/user/user.component';
import {SpeciesDatabaseComponent} from './components/shared/speciesdatabase/speciesdatabase.component';
import {SidenavComponent} from './components/shared/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {ToolbarComponent} from './components/shared/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MenuComponent} from './components/shared/menu/menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {TableComponent} from './components/shared/table/table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {VisitsComponent} from './components/shared/visits/visits.component';
import {MatInputModule} from '@angular/material/input';
import {CollectionComponent} from './components/shared/collection/collection.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {CollectionFormComponent} from './components/shared/collection-form/collection-form.component';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {CollectionDetailComponent} from './components/shared/collection-detail/collection-detail.component';
import {VisitFormComponent} from './components/shared/visit-form/visit-form.component';
import {FindingsListComponent} from './components/shared/findings-list/findings-list.component';
import {FindingFormComponent} from './components/shared/finding-form/finding-form.component';
import {ReviewListComponent} from './components/shared/review-list/review-list.component';
import {ReviewFormComponent} from './components/shared/review-form/review-form.component';
import {ReviewFindingListComponent} from './components/shared/review-finding-list/review-finding-list.component';
import {ReviewFindingCorrectComponent} from './components/shared/review-finding-correct/review-finding-correct.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from "@angular/material/core";
import {VisitDetailComponent} from './components/shared/visit-detail/visit-detail.component';
import {FindingDetailComponent} from './components/shared/finding-detail/finding-detail.component';
import {ReviewDetailComponent} from './components/shared/review-detail/review-detail.component';
import {CommonModule} from "@angular/common";
import {SpeciesService} from "./service/species.service";
import {DashboardComponent} from './components/shared/dashboard/dashboard.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SpeciesFilterComponent} from './components/shared/species-filter/species-filter.component';
import {ConfirmDialogComponent} from './components/shared/confirm-dialog/confirm-dialog.component';
import {ConfirmDeleteReviewComponent} from './components/shared/confirm-delete-review/confirm-delete-review.component';
import {BeesComponent} from './components/shared/bees/bees.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {VisitConfirmDeleteComponent} from './components/shared/visit-confirm-delete/visit-confirm-delete.component';
import {FindingConfirmDeleteComponent} from './components/shared/finding-confirm-delete/finding-confirm-delete.component';
import {SpeciesSearchFormComponent} from './components/shared/species-search-form/species-search-form.component';
import {BeesDetailComponent} from './components/shared/bees-detail/bees-detail.component';
import {PrintTagsComponent} from './components/shared/print-tags/print-tags.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {FindingDetailPrintComponent} from './components/shared/finding-detail-print/finding-detail-print.component';
import {SliderSizeComponent} from './components/shared/slider-size/slider-size.component';
import {MatChipsModule} from "@angular/material/chips";
import {InfoPrintTemplateComponent} from './components/shared/info-print-template/info-print-template.component';
import { PrintTagsVersion0Component } from './components/shared/print-tags-version0/print-tags-version0.component';
import { PrintTagsVersion1Component } from './components/shared/print-tags-version1/print-tags-version1.component';
import { PrintTagsVersion2Component } from './components/shared/print-tags-version2/print-tags-version2.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: UserComponent},
  {path: 'species-database', component: SpeciesDatabaseComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'table', component: TableComponent},
  {path: 'visit', component: VisitsComponent},
  {path: 'collection/:id/visit-detail/:visitId', component: VisitDetailComponent},
  {path: 'collections', component: CollectionComponent},
  {path: 'collection-detail/:id', component: CollectionDetailComponent},
  {path: 'collection/:id/visit-detail/:visitId/finding-detail/:findingId', component: FindingDetailComponent},
  {path: 'finding-detail-print/:findingId', component: FindingDetailPrintComponent},
  {path: 'review', component: ReviewListComponent},
  {path: 'review-detail/:reviewId', component: ReviewDetailComponent},
  {path: 'bees-detail/:beeId', component: BeesDetailComponent},
  {path: 'bees', component: BeesComponent},
  {path: 'dashboard', component: DashboardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    UserComponent,
    SpeciesDatabaseComponent,
    SidenavComponent,
    ToolbarComponent,
    MenuComponent,
    TableComponent,
    VisitsComponent,
    CollectionComponent,
    CollectionFormComponent,
    CollectionDetailComponent,
    VisitFormComponent,
    FindingsListComponent,
    FindingFormComponent,
    ReviewListComponent,
    ReviewFormComponent,
    ReviewFindingListComponent,
    ReviewFindingCorrectComponent,
    VisitDetailComponent,
    FindingDetailComponent,
    ReviewDetailComponent,
    DashboardComponent,
    ConfirmDialogComponent,
    ConfirmDeleteReviewComponent,
    BeesComponent,
    VisitConfirmDeleteComponent,
    FindingConfirmDeleteComponent,
    SpeciesSearchFormComponent,
    BeesDetailComponent,
    FindingDetailPrintComponent,
    SliderSizeComponent,
    InfoPrintTemplateComponent,
    // PrintTagsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    CommonModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    MatAutocompleteModule,
    SpeciesFilterComponent,
    MatProgressSpinnerModule,
    PrintTagsComponent,
    PrintTagsVersion0Component,
    PrintTagsVersion1Component,
    PrintTagsVersion2Component,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    NgxPrintModule,
    MatChipsModule
  ],
  exports: [
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    SpeciesDatabaseComponent,
    MatAutocompleteModule
  ],
  providers: [
    ApiService,
    UserSessionService,
    SpeciesService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-CH'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
