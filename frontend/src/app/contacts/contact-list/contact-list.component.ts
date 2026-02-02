import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['../contact-form.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: any[] = [];
  search = '';
  currentPage = 1;
  lastPage = 1;
  total = 0;
  sort = 'lastname';
  direction: 'asc' | 'desc' = 'asc';

  pagination: any;

  constructor(
    private contactService: ContactService,
    private router: Router   // ✅ REQUIRED
  ) {
  }

  ngOnInit(): void {
    this.loadContacts(1);
  }

  addContact(): void {
    this.router.navigate(['/contacts/new']);
  }

  loadContacts(page = 1): void {
    this.currentPage = page;

    this.contactService.list(
      page,
      this.search,
      this.sort,
      this.direction
    ).subscribe(res => {
      this.contacts = res.data;
      this.currentPage = res.current_page;
      this.lastPage = res.last_page;
      this.total = res.total;
    });
  }

  sortBy(column: string) {
    if (this.sort === column) {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort = column;
      this.direction = 'asc';
    }

    this.loadContacts();
  }

  delete(id: number): void {
    if (!confirm('Delete this contact?')) return;

    this.contactService.delete(id).subscribe({
      next: (res: any) => {
        // Option 1: Remove the deleted row locally
        this.contacts = this.contacts.filter(c => c.id !== id);

        // Optionally, show a toast or alert
        console.log('Contact deleted successfully');

        // Option 2 (if backend returns paginated list instead):
        this.loadContacts(this.currentPage);
      },
      error: err => {
        console.error('Failed to delete contact', err);
        alert('Failed to delete contact');
      }
    });
  }
}
