export interface Post {
  _id: string;
  creator: string;
  title: string;
  content: string;
  date: Date;
  lastEdited?: Date;
  tag: string;
}
