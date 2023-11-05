import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PicturePostDto} from "../interface/picture-post-dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl: String = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/home/pictures`)
  }

  getPostDetails(pictureId: String): Observable<any> {
    console.log('making call')
    return this.http.get<any>(`${this.apiUrl}/picture/post/` + pictureId)
  }

  getUserProfileDetails(displayName: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/profile/` + displayName);
  }

  postPicture(picturePostDto: PicturePostDto, pictureImage: File | null) {
    const formData = new FormData();

    const picturePart = new Blob([JSON.stringify(picturePostDto)], {
      type: 'application/json',
    });
    formData.append('pictureDetails', picturePart);

    if (pictureImage != null) {
      formData.append('inpFile', pictureImage)
    }

    const options = {
      withCredentials: true, // Include cookies in the request
    };

    return this.http.post<any>(`${this.apiUrl}/picture/post`, formData, options);
  }

  getMatchingUsers(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/find?query=${query}`);
  }

}
