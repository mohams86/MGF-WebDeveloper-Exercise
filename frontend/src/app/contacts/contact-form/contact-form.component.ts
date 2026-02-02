import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../contact.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['../contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  id!: number;
  loading = false;
  serverError = '';
  companies: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {
  }

  ngOnInit(): void {
    this.contactService.getCompanies().subscribe(data => this.companies = data);
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company_id: ['', Validators.required]
    });

    // load companies
    this.contactService.getCompanies().subscribe(data => this.companies = data);

    // Check if editing
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.id = +params['id'];
        this.loadContact(this.id);
      }
    });
  }

  loadContact(id: number) {
    this.loading = true;
    this.contactService.get(id).subscribe({
      next: contact => {
        this.form.patchValue(contact);
        this.loading = false;
      },
      error: err => {
        console.error('Error loading contact', err);
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request$ = this.isEdit
      ? this.contactService.update(this.id, this.form.value)
      : this.contactService.create(this.form.value);

    request$.subscribe({
      next: (res: any) => {
        //backend returns 200 with validation errors
        if (res?.message === 'Validation failed' && res.errors) {
          Object.keys(res.errors).forEach(field => {
            const control = this.form.get(field);
            if (control) {
              control.setErrors({
                backend: res.errors[field][0]
              });
              control.markAsTouched();
            }
          });
          return;
        }

        //redirect only on success
        this.router.navigate(['/contacts']);
      },
      error: err => {
        //STOP redirect
        if (err.status === 422 && err.error?.errors) {
          Object.keys(err.error.errors).forEach(field => {
            const control = this.form.get(field);
            if (control) {
              control.setErrors({
                backend: err.error.errors[field][0]
              });
            }
          });
        }
      }
    });
  }

  // convenience getter for easy access to form controls
  get f() {
    return this.form.controls;
  }
}
