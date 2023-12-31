import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  pictureId: string | null = '';
  postDetails: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.pictureId = this.route.snapshot.paramMap.get('pictureId');

    if (this.pictureId != null)
      this.apiService.getPostDetails(this.pictureId).subscribe(
        (data) => { this.postDetails = data; }
      );
  }

  // formatDate(dateString: string | null): string | null {
  //   if (!dateString) return '';
  //   const date = new Date(dateString);
  //   return this.datePipe.transform(date, 'd MMM yyyy');
  // }

}
