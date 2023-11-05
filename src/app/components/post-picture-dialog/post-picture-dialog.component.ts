import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {PicturePostDto} from "../../interface/picture-post-dto";
import {faTrashCan, faUpload} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-picture-dialog',
  templateUrl: './post-picture-dialog.component.html',
  styleUrls: ['./post-picture-dialog.component.css']
})
export class PostPictureDialogComponent {

  picturePostDto: PicturePostDto = { description: ''};
  selectedPicture: File | null = null;
  faUpload = faUpload;
  faTrash = faTrashCan;

  constructor(
    private dialogRef: MatDialogRef<PostPictureDialogComponent>,
    private apiService: ApiService
  ) { }

  postPicture(): void {
    this.apiService.postPicture(this.picturePostDto, this.selectedPicture).subscribe(
      (response) => {
        // Handle successful response
        console.log('Response:', response);
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
      }
    );
    console.log('call made')
    this.closeDialog()
    window.location.reload();
  }

  picture: string = '../../assets/images/picture-placeholder.png';
  onPictureChange(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedPicture = fileInput.files[0]
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.picture = e.target.result;

      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  onDeletePicture() {
    this.picture = '../../assets/images/picture-placeholder.png';
    this.selectedPicture = null
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
