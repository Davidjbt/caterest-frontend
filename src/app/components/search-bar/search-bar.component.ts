import {Component} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  faSearch = faSearch
  query: string = ''

  constructor(private apiService: ApiService) { }

  search(): void {
      if (this.query.length != 0) {
        this.apiService.getMatchingUser(this.query);
      }
  }

}
