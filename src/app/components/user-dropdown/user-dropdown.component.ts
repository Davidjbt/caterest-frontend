import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent {

  user: string | null = sessionStorage.getItem('user')
  username : string = this.user? JSON.parse(this.user).username : null;

  constructor(authService: AuthService) {
  }

  // Function to handle logout
  logout(): void {
    // Implement your logout logic here
    // For example, clear user data and redirect to the login page
    // You can also add a redirection to the login page here
  }

}
