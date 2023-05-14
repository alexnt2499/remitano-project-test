import { UserInfoType } from "./AuthType";

export interface SharedType {
  id: number;
  name: string;
  description: string;
  url: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: UserInfoType;
}

export interface SharedTypeResponse {
  shared: Array<SharedType>;
  total: number;
}
