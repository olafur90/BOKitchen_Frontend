import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule
  ]
})
export class ProfileComponent implements OnInit {
  user?: User;
  authenticated: boolean = false;

  constructor(private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    await this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.authenticated = true;
        console.log(user);
      }
    });
  }
}
