import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-upload-box',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})
export class UploadBoxComponent {
  constructor() {
  }

  selectedFile: File | null = null;

  @Input() allowedType: number = 0;
  @Output() fileSelected = new EventEmitter<File>();
  @Output() ActionBtn = new EventEmitter();

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileSelected.emit(this.selectedFile);
    }
  }

  ActionBtnClick() {
      this.ActionBtn.emit();
  }
}
