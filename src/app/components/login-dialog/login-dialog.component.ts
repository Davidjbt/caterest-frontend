import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserLoginDto} from 'src/app/interface/user-login-dto';
import {AuthService} from "../../services/auth.service";

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
    private authService: AuthService
  ) { }

  login() {
   this.authService.login(this.userLoginDto).subscribe(
    (response) => {
      console.log('Login Successful', response);
      this.dialogRef.close();

    },
    (error) => { console.error('Login Error', error) }
   )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
