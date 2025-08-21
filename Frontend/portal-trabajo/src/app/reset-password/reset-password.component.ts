import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { BigLogoComponent } from '../big-logo/big-logo.component';
import { RouteTranslationService } from '../services/route-translation.service';

@Component({
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss',
    imports: [ReactiveFormsModule, BigLogoComponent],
})
export class ResetPasswordComponent implements OnInit {

    credentials: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private routeTranslation: RouteTranslationService,
    ) {
        this.credentials = formBuilder.group({
            token: [''],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe((params: Params) => {
                this.credentials.controls['token'].setValue(params['token']);
            });
    }


    submit() {
        if (this.credentials.invalid) {
            return;
        }
        this.userService.resetPassword({ token: this.credentials.value.token, nuevaContrasena: this.credentials.value.password }).subscribe({
            next: (res) => {
                if (res.status === 200) {
                    this.toastr.success('Contrasena reseteada con éxito', 'Nueva contrasena')
                    setTimeout(() => {
                        this.routeTranslation.navigateToTranslated(['login']);
                    }, 2000);
                }
            },
            error: (err: any) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.log('Error');
            }
        })
    }

}