import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gen-dropdown',
  templateUrl: './gen-dropdown.component.html',
  styleUrls: ['./gen-dropdown.component.scss'],
})
export class GenDropdownComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.addEventListener('click', (event: any) => {
      let isInGenDropdown = event.path.some((el: any) => el.tagName === 'APP-GEN-DROPDOWN')
      if (!isInGenDropdown && this.active) {
        this.active = false;
      }
    })
  }

  active = false;

  gens = [
    {
      id: 'gen-i',
      label: 'Gen I',
      range: {
        from: 1,
        to: 151,
      },
    },
    {
      id: 'gen-ii',
      label: 'Gen II',
      range: {
        from: 152,
        to: 251,
      },
    },
    {
      id: 'gen-iii',
      label: 'Gen III',
      range: {
        from: 252,
        to: 386,
      },
    },
    {
      id: 'gen-iv',
      label: 'Gen IV',
      range: {
        from: 387,
        to: 493,
      },
    },
    {
      id: 'gen-v',
      label: 'Gen V',
      range: {
        from: 494,
        to: 649,
      },
    },
    {
      id: 'gen-vi',
      label: 'Gen VI',
      range: {
        from: 650,
        to: 721,
      },
    },
    {
      id: 'gen-vii',
      label: 'Gen VII',
      range: {
        from: 722,
        to: 809,
      },
    },
    {
      id: 'gen-viii',
      label: 'Gen VIII',
      range: {
        from: 810,
        to: 898,
      },
    },
  ];

  toggleActive() {
    this.active = !this.active;
    console.log(this.active)
  }
}
