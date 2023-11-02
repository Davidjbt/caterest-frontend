import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  query: string = '';
  constructor(private route: ActivatedRoute,
              private apiService: ApiService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'];
      console.log(this.query);
      this.searchUser();
    });
  }

  searchUser() {
    this.apiService.getMatchingUsers(this.query).subscribe({
      next: response=> {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    })
  }



}
