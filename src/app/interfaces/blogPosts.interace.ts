// User interface
export interface User {
    id: string;
    displayName: string;
    email: string;
    photoURL?: string;
    createdAt: Date;
}
  
// BlogPost interface
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: {
        userId: string;
        displayName: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

// Comments interface
export interface Comment {
    id: string;
    content: string;
    author: {
      userId: string;
      displayName: string;
    };
    createdAt: Date;
  }