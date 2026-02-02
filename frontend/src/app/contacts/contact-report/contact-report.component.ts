import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-report.component.html'
})
export class ContactReportComponent implements OnInit {
  data: { area: string; total: number }[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.reportByArea().subscribe({
      next: (res) => this.data = res,
      error: (err) => console.error('Failed to fetch report', err)
    });
  }
}
