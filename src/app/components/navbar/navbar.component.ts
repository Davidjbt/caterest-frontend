import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {AuthService} from "../../services/auth.service";
import {AuthenticatedUser} from "../../interface/authenticated-user";
import {PostPictureDialogComponent} from "../post-picture-dialog/post-picture-dialog.component";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    loggedIn: AuthenticatedUser | null = null;
    currentRoute: string = '';

    constructor(
      private dialog: MatDialog,
      private authService: AuthService,
      private router: Router
    ) { }

    ngOnInit(): void {
      this.authService.isLoggedIn().subscribe((loggedIn) => {
        this.loggedIn = loggedIn;
      })

      if (!this.loggedIn) {
        const user = sessionStorage.getItem('user');
        if (user)
          this.loggedIn = JSON.parse(user);
      }

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd)
          this.currentRoute = event.url;
          // console.log(this.currentRoute);
      })


    }

    openLoginDialog() {
        this.dialog.open(LoginDialogComponent, {
            width: '400px'
        });
    }

    openRegisterDialog() {
        this.dialog.open(RegisterDialogComponent, {
            width: '400px'
        });
    }

    openPostPictureDialog() {
      this.dialog.open(PostPictureDialogComponent, {
            width: '400px'
      })
    }

    showUserMenu: boolean = false;
    toggleUserMenu(): void {
      this.showUserMenu = !this.showUserMenu;
    }

    // Function to handle logout
    logout(): void {
      // Implement your logout logic here
      // For example, clear user data and redirect to the login page
      // You can also add a redirection to the login page here
    }

}
