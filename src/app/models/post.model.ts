export interface Post {
  _id: string;
  creator: string;
  title: string;
  content: string;
  date: Date;
  likes: [];
  hates: [];
  lastEdited?: Date;
  tag: string;
  likeStatus?: boolean;
  hateStatus?: boolean;
}
