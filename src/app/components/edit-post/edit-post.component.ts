import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../../services/blog-post.service';
import { EditModalService } from '../../services/edit-modal.service';
import { BlogPost } from '../../interfaces/blogPosts.interace';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {

  constructor(
    public blogPostService: BlogPostService,
    public editModalService: EditModalService,
    private router: Router,
  ) {}

  currentPost = this.editModalService.postData;
  currentPostText = this.editModalService.postData?.content ?? '';

  updatePost(postId: string) {
    console.log("CurrentPost Text: ", this.currentPostText)
    console.log(postId)
    this.blogPostService.editPost(postId, this.currentPostText);
    this.router.navigateByUrl('/home');
  }

  cancelUpdate() {
    // this.editModalService.toggleEditPost();
    this.router.navigateByUrl('/home');
  }

}
