import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserRegisterDto} from '../../interface/user-register-dto';
import {AuthService} from "../../services/auth.service";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {faTrashCan, faUpload} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {

  faUpload = faUpload;
  faTrash = faTrashCan;
  selectedProfilePicture: File | null = null;
  confirmPassword: String = '';
  userRegisterDto: UserRegisterDto = {
    username: '',
    email: '',
    password: '',
    biography: ''
  }

  constructor(
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  register(): void {
    this.authService.register(this.userRegisterDto, this.selectedProfilePicture).subscribe(
      {
        next: response => {
          console.log('Registration successful:', response);
          this.dialogRef.close();
        },
        error: error => {
          console.error('Registration failed:', error);
        }
      }
    );
  }

  profilePicture: string = '../../assets/images/placeholder-profile.png';
  onPictureChange(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedProfilePicture = fileInput.files[0]
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result; // Update the profilePicture with the selected image

      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  onDeletePicture(): void {
    this.profilePicture = '../../assets/images/placeholder-profile.png';
    this.selectedProfilePicture = null
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openLoginDialog(): void {
    this.dialogRef.close();
    this.dialog.open(LoginDialogComponent, {
      'width': '400pxs'
    })
  }

}
