export interface Message{
    id?:string;
    text:string;
    from:string;
    to:string;
    created?:Date;
    visto?:boolean;
}