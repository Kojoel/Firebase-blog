import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { BlogsFirebaseService } from '../../services/blogs-firebase.service';
import { BlogPost, Comments, Users } from '../../interfaces/blogPosts.interace';
import { CommonModule } from '@angular/common';
import { BlogPostService } from '../../services/blog-post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserProfileComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private blogPostFireService: BlogsFirebaseService,
    public blogPostService: BlogPostService,

  ) {}

  blogPosts!: BlogPost[];
  users!: Users[];
  comments!: Comments[];

  content: string = '';

  visible: boolean = false;

  commentsVisible: boolean = false;

  createdAt: Date | undefined;

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

    this.blogPostFireService.getBlogPosts().subscribe(blogPosts => {
      this.blogPosts = blogPosts;
      console.log("BlogPosts: ", this.blogPosts);
      // this.blogPostService.blogPostSig.set(blogPosts);
    })
    
    this.blogPostFireService.getUsers().subscribe(users => {
      this.users = users;
      console.log("Users: ", this.users);
    })

    this.blogPostFireService.getComments().subscribe(comments => {
      this.comments = comments;
      console.log("Comments", this.comments);
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/')
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  toggleMenuVisibility() {
    this.visible = !this.visible;
  }

  toggleCommentsVisibility() {
    this.commentsVisible = !this.commentsVisible;
    console.log(this.commentsVisible);
  }

  // getTimeStamps() {
  //   this.blogPosts.forEach(items => {
  //     const createdAt = items.createdAt

  //   })
  // }

  // convertTimestampToDateTime(timestamp: string) {
  //   const date = new Date(timestamp * 1000); // Convert to milliseconds
  //   return date.toLocaleString(); // Return as a human-readable string
  // }

}
