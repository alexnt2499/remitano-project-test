export interface LoginParamsType {
  email: string;
  password: string;
}

export interface SignupParamsType {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponseType {
  auth_token: string;
}

export interface SignUpResponseType {
  data: string;
}

export interface UserInfoType {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
