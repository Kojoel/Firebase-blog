import { Injectable, signal } from '@angular/core';
import { BlogPost } from '../interfaces/blogPosts.interace';
import { BlogsFirebaseService } from './blogs-firebase.service';
import { addDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(
    private blogsFireBaseService: BlogsFirebaseService
  ) { }

  createPost(content: string): void {
    // this.blogPostSig.update((blogPosts) => [...blogPosts, newPost]);
    addDoc(this.blogsFireBaseService.blogPostsCollection, {
      'content': content,
      'createdAt': new Date(),
      'updatedAt': new Date(),
      'userId': '',
    })
  }

  addComment(comment: string, postId: string): void {
    addDoc(this.blogsFireBaseService.commentsCollection, {
      'content': comment,
      'createdAt': new Date(),
      'postId': postId,
      'userId': '',
    })
  }

  editPost(postId: string, updatedContent: string): void {
    const postToEdit = doc(this.blogsFireBaseService.blogPostsCollection, postId);

    updateDoc(postToEdit, {
      content: updatedContent,
      updatedAt: new Date(),
    }).then(() => {
      console.log('Post updated successfully');
    }).catch(error => {
      console.error('Error updating post:', error);
    })
  }


}
