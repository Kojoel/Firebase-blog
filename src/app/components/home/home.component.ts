import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { BlogsFirebaseService } from '../../services/blogs-firebase.service';
import { BlogPost } from '../../interfaces/blogPosts.interace';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private blogPostService: BlogsFirebaseService,
  ) {}

  blogPosts!: BlogPost[];

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

    this.blogPostService.getBlogPosts().subscribe(blogPosts => {
      // console.log(blogPosts);
      this.blogPosts = blogPosts;
      console.log(this.blogPosts);
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/')
  }


}
