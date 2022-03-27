import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';


export interface SortResult {
  by: 'id' | 'name';
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-sort-dropdown',
  templateUrl: './sort-dropdown.component.html',
  styleUrls: ['./sort-dropdown.component.scss'],
})
export class SortDropdownComponent implements OnInit {
  constructor() {}


  @ViewChild('form') form!: ElementRef<HTMLFormElement>;
  @Output() formResult: EventEmitter<SortResult> = new EventEmitter<SortResult>();
  active = false;
  defaultSortBy = 'id';
  defaultSortDirection = 'asc';

  ngOnInit(): void {
    window.addEventListener('click', (event: any) => {
      let isInSortDropdown = event.path.some(
        (el: any) => el.tagName === 'APP-SORT-DROPDOWN'
      );
      if (!isInSortDropdown && this.active) {
        this.active = false;
      }
    });
  }

  toggleActive() {
    this.active = !this.active;
  }

  onSubmit(form: NgForm) {
    this.formResult.emit(form.value);
    this.active = false;
  }
}
