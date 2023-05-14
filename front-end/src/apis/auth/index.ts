import ApiClientBase from "../ApiClientBase";
import {
  LoginParamsType,
  LoginResponseType,
  SignUpResponseType,
  SignupParamsType,
  UserInfoType,
} from "../types/AuthType";
import qs from "qs";
import { AuthBaseResponseType } from "../types/BaseType";

class ApiAuth extends ApiClientBase {
  constructor() {
    super();
    this.instance.defaults.headers["Content-Type"] =
      "application/x-www-form-urlencoded";
  }

  /**
   * Login
   */
  public async login(params: LoginParamsType): Promise<LoginResponseType> {
    const res = await this.instance.post("/login", params);
    return res.data;
  }

  /**
   * SignUp
   */
  public async signUp(params: SignupParamsType): Promise<SignUpResponseType> {
    const res = await this.instance.post("/signup", params);
    return res.data;
  }

  /**
   * get info user
   */
  public async getMe(
    access_token: string
  ): Promise<AuthBaseResponseType<UserInfoType>> {
    const res = await this.instance.get("/me", {
      headers: {
        Authorization: `${access_token}`,
      },
    });
    return res.data;
  }
}

export default ApiAuth;
