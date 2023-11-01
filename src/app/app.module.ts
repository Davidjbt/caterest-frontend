import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginDialogComponent} from './components/login-dialog/login-dialog.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog'
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon';
import {RegisterDialogComponent} from './components/register-dialog/register-dialog.component';
import {PostComponent} from './components/post/post.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {PostPictureDialogComponent} from './components/post-picture-dialog/post-picture-dialog.component';
import {UserDropdownComponent} from './components/user-dropdown/user-dropdown.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ResultsComponent} from './components/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    PostComponent,
    UserProfileComponent,
    PostPictureDialogComponent,
    UserDropdownComponent,
    SearchBarComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
