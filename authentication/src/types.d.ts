export interface UserCreate {
  name: String;
  username: String;
  email: String;
  email_verified_at: Date;
  password: String;
  imgURL: String;
  platform: String;
  push_token: String;
  roles: String[];
}