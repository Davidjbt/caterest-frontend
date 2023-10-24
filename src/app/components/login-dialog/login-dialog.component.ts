import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserLoginDto} from 'src/app/interface/user-login-dto';
import {AuthService} from "../../services/auth.service";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  userLoginDto: UserLoginDto = {
    'email': '',
    'password': ''
  };

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  login() {
   this.authService.login(this.userLoginDto).subscribe(
     {
       next: response => {
         console.log('Login Successful', response);
         this.dialogRef.close();

       },
       error: error => {
         console.error('Login Error', error)
       }
     }
   )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openRegisterDialog(): void {
    this.dialogRef.close();
    this.dialog.open(RegisterDialogComponent, {
      'width': '400px'
    });
  }

}
