import {Component} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  faSearch = faSearch
  query: string = ''

  constructor(private router: Router) { }

  performSearch(): void {
     if (this.query) {
       this.router.navigate(['/results'], {queryParams: {query: this.query}})
     }
  }



}
