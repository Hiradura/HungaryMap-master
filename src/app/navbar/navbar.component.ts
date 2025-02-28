import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user:any;
  constructor(private authService: AuthService, public router:Router) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user
    })
  }
  logout() {
    this.authService.logout().then(() => {
      console.log("Kijelentkezve")
      alert("Sikeres kijelentkezés.")
    })
    .catch(err => {console.error(err), alert("Sikertelen kijelentkezés.")})
  }
}
