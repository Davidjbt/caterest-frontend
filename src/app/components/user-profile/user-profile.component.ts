import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  displayName: string | null = '';
  userProfileDetails: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.displayName = this.route.snapshot.paramMap.get('displayName');

    if (this.displayName != null)
      this.apiService.getUserProfileDetails(this.displayName).subscribe(
        (data) => { this.userProfileDetails = data; }
      );

    this.apiService.getUserProfileDetails(this.displayName);
  }

}
