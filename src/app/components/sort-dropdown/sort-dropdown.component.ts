import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-dropdown',
  templateUrl: './sort-dropdown.component.html',
  styleUrls: ['./sort-dropdown.component.scss'],
})
export class SortDropdownComponent implements OnInit {
  constructor() {}

  active = false;
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
}
