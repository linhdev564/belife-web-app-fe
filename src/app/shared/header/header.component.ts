import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor(private translate: TranslateService) {}

  changeLang(event: Event) {
    var lang = (event.target as HTMLInputElement).value;
    console.log('Language changed to:', lang);
    this.translate.use(lang);
  }
}
