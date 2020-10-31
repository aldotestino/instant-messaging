type User = {
  email: string;
  username: string;
  password: string;
  photoUrl?: string;
  confirmed?: boolean;
}

export default User;