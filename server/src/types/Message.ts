type Author = {
  username: string;
  photoUrl: string | undefined;
}

type Message = {
  content: string;
  date: string;
  user_id: string;
  author?: Author;
}

export default Message;
export {
  Author
};