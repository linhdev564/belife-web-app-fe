import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router, private toastr: ToastrService, 
    private api: ApiService, private authService: AuthService) {}

  login() {
    if(this.username === '' || this.password === '') {
      this.toastr.warning('Vui lòng nhập tài khoản và mật khẩu!');
      return;
    }
    var reqData = {
      UserName: this.username,
      Password: this.password,
      RememberMe: this.rememberMe
    }
    this.api.post('api/user/login', reqData)
      .subscribe({
        next: (res: any) => {
          if (res?.ErrorCode === '000000' && res?.Data?.length > 0) {
            const sessionId = res.Data[0].SessionId;

            // Lưu sessionInfo
            var sessionInfo = {
              sessionId: sessionId,
              username: this.username,
            }
            this.authService.setSessionInfo(sessionInfo);

            // Điều hướng về trang chủ
            this.router.navigate(['/home']);
          } else {
            // API trả về nhưng không thành công
            this.toastr.error(res?.ErrorMessage || 'Đăng nhập thất bại');
          }
        },
        error: (err: any) => {
          // Lỗi trong quá trình gọi API
          this.toastr.error('Lỗi kết nối: ' + (err?.message || 'Không xác định'));
          console.error('API error:', err);
        }
      });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }
}
