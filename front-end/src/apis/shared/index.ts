import ApiClientBase from "../ApiClientBase";
import { AuthBaseResponseType } from "../types/BaseType";
import { SharedType, SharedTypeResponse } from "../types/SharedType";

class SharedAuth extends ApiClientBase {
  constructor() {
    super();
  }

  /**
   * get list shared
   */
  public async getListShared(
    access_token: string,
    page: number,
    per_page: number
  ): Promise<SharedTypeResponse> {
    const res = await this.instance.get(
      `/shared/?page=${page}&per_page=${per_page}`,
      {
        headers: {
          Authorization: `${access_token}`,
        },
      }
    );
    return res.data;
  }

  /**
   * get list shared
   */
  public async createShared(
    access_token: string,
    name: string,
    url: string,
    description: string
  ): Promise<Array<SharedType>> {
    const res = await this.instance.post(
      `/shared/`,
      {
        name,
        url,
        description,
      },
      {
        headers: {
          Authorization: `${access_token}`,
        },
      }
    );
    return res.data;
  }
}

export default SharedAuth;
