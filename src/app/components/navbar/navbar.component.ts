import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {AuthService} from "../../services/auth.service";
import {AuthenticatedUser} from "../../interface/authenticated-user";
import {PostPictureDialogComponent} from "../post-picture-dialog/post-picture-dialog.component";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    loggedIn: AuthenticatedUser | null = null;

    constructor(
      private dialog: MatDialog,
      private authService: AuthService
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

}
