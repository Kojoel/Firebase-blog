import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if(user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        })
      }
      else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    })
  }

  logout() {
    this.authService.logout();
  }

  goToHome() {
    this.router.navigateByUrl('/home')
  }
}
