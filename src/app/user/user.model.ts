export interface User {
    id?: string;
    email: string;
    username: string;
    socketId?: string;
    password?:string;
    status?:boolean;
    created?: Date; 
  }
  