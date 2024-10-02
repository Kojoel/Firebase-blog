// User interface
export interface User {
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
export interface Comment {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
  }