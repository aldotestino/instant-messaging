type User = {
  email: string;
  username: string;
  password: string;
  photoUrl?: string;
  confirmed?: boolean;
  token?: string;
}

export default User;