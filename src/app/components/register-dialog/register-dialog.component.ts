import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserRegisterDto} from '../../interface/user-register-dto';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {

  userRegisterDto: UserRegisterDto = {
    username: '',
    email: '',
    password: '',
    biography: ''
  }

  selectedProfilePicture: File | null = null;

  confirmPassword: String = '';

  constructor(
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private authService: AuthService
  ) { }

  register() {
    this.authService.register(this.userRegisterDto, this.selectedProfilePicture).subscribe(
      (response) => {
        console.log('Registration successful:', response);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }

  profilePicture: string = '../../assets/images/placeholder-profile.png';
  onPictureChange(event: any) {
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

  onDeletePicture() {
    this.profilePicture = '../../assets/images/placeholder-profile.png';
    this.selectedProfilePicture = null
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
