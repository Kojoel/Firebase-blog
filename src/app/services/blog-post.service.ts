import { Injectable, signal } from '@angular/core';
import { BlogPost } from '../interfaces/blogPosts.interace';
import { BlogsFirebaseService } from './blogs-firebase.service';
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  userId: string | null | undefined = '';

  constructor(
    private blogsFireBaseService: BlogsFirebaseService,
    private authService: AuthService,
  ) { 
    this.authService.user$.subscribe(user => this.userId = user?.email)
  }

  createPost(content: string): void {
    // this.blogPostSig.update((blogPosts) => [...blogPosts, newPost]);
    addDoc(this.blogsFireBaseService.blogPostsCollection, {
      'content': content,
      'createdAt': new Date(),
      'updatedAt': new Date(),
      'userId': this.userId,
    })
  }

  addComment(comment: string, postId: string): void {
    addDoc(this.blogsFireBaseService.commentsCollection, {
      'content': comment,
      'createdAt': new Date(),
      'postId': postId,
      'userId': this.userId,
    })
  }

  editPost(postId: string, updatedContent: string): void {
    const postToEdit = doc(this.blogsFireBaseService.blogPostsCollection, postId);

    updateDoc(postToEdit, {
      content: updatedContent,
      updatedAt: new Date(),
    }).then(() => {
      // console.log('Post updated successfully');
    }).catch(error => {
      // console.error('Error updating post:', error);
    })
  }

  
  deleteComment(commentId: string): void{
    const commentDel = doc(this.blogsFireBaseService.commentsCollection, commentId);

    deleteDoc(commentDel).then(() => {
      // console.log("comment deleted", commentDel);
    }).catch(error => {
      // console.error("Error deleting comment", error);
    })
  }


  async deletePost(postId: string): Promise<void>{
    const postToDel = doc(this.blogsFireBaseService.blogPostsCollection, postId);
    deleteDoc(postToDel).then(() => {
      // console.log("Post deleted", postToDel);
    }).catch(error => {
      // console.error("Error deleting Post", error);
    })

    const commentsQuery = query(this.blogsFireBaseService.commentsCollection, where("postId", "==", postId));
    const commentsSnapshot = await getDocs(commentsQuery);

    const deletePromises = commentsSnapshot.docs.map(commentDoc => 
      deleteDoc(doc(this.blogsFireBaseService.commentsCollection, commentDoc.id))
    );

    await Promise.all(deletePromises);
  }



}
