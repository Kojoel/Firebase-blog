import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { BlogsFirebaseService } from '../../services/blogs-firebase.service';
import { BlogPost, Comments, Users } from '../../interfaces/blogPosts.interace';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { BlogPostService } from '../../services/blog-post.service';
import { FormsModule } from '@angular/forms';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { EditModalService } from '../../services/edit-modal.service';
import { doc, getDocs, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserProfileComponent, CommonModule, FormsModule, EditPostComponent, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private blogPostFireService: BlogsFirebaseService,
    public blogPostService: BlogPostService,
    public editModalService: EditModalService,

  ) {}

  blogPosts!: BlogPost[];
  users!: Users[];
  comments!: Comments[];

  content: string = '';
  comment: string = '';

  visible: boolean = false;
  // editModalVisible: boolean = false;

  commentsVisible: boolean = false;
  visibleCommentPostId: string | null = null;

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
    })

    this.blogPostFireService.getBlogPosts().subscribe(blogPosts => {
      this.blogPosts = blogPosts;
    })
    
    this.blogPostFireService.getUsers().subscribe(users => {
      this.users = users;
  
    })

    this.blogPostFireService.getComments().subscribe(comments => {
      this.comments = comments;
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


  toggleCommentsVisibility(postId: string) {
    if (postId  === this.visibleCommentPostId) {
      this.visibleCommentPostId = null;
      this.commentsVisible = false;
    } else {
      this.visibleCommentPostId = postId;
      this.commentsVisible = true;
    }
  }


  createPost() {
    this.blogPostService.createPost(this.content);
    this.content = '';
  }

  addComment(postId: string) {
    this.blogPostService.addComment(this.comment, postId);
    this.comment = '';
  }
  
}
