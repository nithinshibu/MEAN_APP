import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export default class ResetComponent implements OnInit {
  fb = inject(FormBuilder);
  resetForm!: FormGroup;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  token!: string;
  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );

    this.activatedRoute.params.subscribe((val) => {
      this.token = val['token'];
      console.log('TOKEN:', this.token);
    });
  }
  reset() {
    //console.log("RESET::",this.resetForm.value);
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password,
    };
    this.authService.resetPasswordService(resetObj).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['login']);
      },
      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }
}
