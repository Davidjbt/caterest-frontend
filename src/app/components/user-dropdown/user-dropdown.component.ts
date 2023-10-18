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

  constructor(private authService: AuthService) { }

  // Function to handle logout
  logout(): void {
    console.log('here')
    this.authService.logOut().subscribe();
  }

}
