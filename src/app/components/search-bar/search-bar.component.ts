import {Component} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  query: string = ''

  constructor(private apiService: ApiService) { }

  search(): void {
      if (this.query.length != 0) {
        this.apiService.getMatchingUser(this.query);
      }
  }

}
