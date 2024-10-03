// User interface
export interface Users {
    id: string;
    displayName: string;
    email: string;
    photoURL?: string;
}
  
// BlogPost interface
export interface BlogPost {
    id: string;
    content: string;
    userid: string;
    createdAt: Date;
    updatedAt: Date;
}

// Comments interface
export interface Comments {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    postId: string;
    
  }