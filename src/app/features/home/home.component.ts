import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UploadBoxComponent } from '../../shared/upload-box/upload-box.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    UploadBoxComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private api: ApiService) {}

  selectedFrom: number = 0;
  selectedTo: number = 0;

  onFormatChangeFrom(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedFrom = Number(select.value);
    console.log('Selected format from:', this.selectedFrom);
  }

  onFormatChangeTo(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedTo = Number(select.value);
    console.log('Selected format to:', this.selectedTo);
  }

  onFileSelected(file: File) {
   console.log('Selected file 2:', file);
  }

  onActionBtnClick() {
    var reqData = {

    };
    this.api.post('api/bookmii/Playground/GetList', reqData)
      .subscribe({
        next: (res) => console.log('Upload successful', res),
        error: (err) => console.error('Upload failed', err)
      });
  }
}
