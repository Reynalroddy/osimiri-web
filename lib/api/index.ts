import axios from "@/utils/axios";
import { LoginType } from "@/utils/types";

export const loginOrRegisterUser = async (
  email: string | undefined,
  password: string | undefined
) => {
  try {
    const { data } = await axios.post<{
      user: any;
      // {
      //   email: string;
      //   fullname: string;
      //   btcaddy: string;
      //   accountbal: number;
      //   totalWithdraw: number;
      //   totalDep: number;
      //   earns: number;
      // };
      token: string;
    }>("/user/login", { email, password });
    // console.log(data);
    const newData = { user: data.user, tokens: data.token };
    if (data) return newData;
    return null;
  } catch (error) {
    return null;
    // throe neew Error(err)
  }
};

export const getRefreshedTokenPair = async (token: any) => {
  try {
    const authHeader = `Bearer ${token?.tokens?.refresh_token}`;

    const { data } = await axios.get("/user/tokens", {
      headers: {
        Authorization: authHeader,
      },
    });

    if (!data) throw new Error("Unable to retrieve tokens");

    token.tokens = data.token;

    return { ...token };
  } catch (error: any) {
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
};

export const getRefreshedUser = async (token: any) => {
  try {
    const authHeader = `Bearer ${token?.tokens?.access_token}`;

    const { data } = await axios.get("/user/me", {
      headers: {
        Authorization: authHeader,
      },
    });

    if (!data) throw new Error("Unable to retrieve tokens");

    token.user = data.user;

    return { ...token };
  } catch (error: any) {
    return { ...token, error: "AccessTokenError" as const };
  }
};
