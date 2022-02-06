import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public sideNavOptions = [
    { icon: 'assessment', text: 'Pomiary', link: './pomiary' },
    { icon: 'person', text: 'Użytkownik', link: './uzytkownik' }
  ]

  constructor() { }

}
