import {
  getRefreshedTokenPair,
  getRefreshedUser,
  loginOrRegisterUser,
} from "@/lib/api";
import { AuthOptions, Session } from "next-auth";
const tokenExpiration = 60 * 60 * 24;
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const data = await loginOrRegisterUser(
          credentials?.email,
          credentials?.password
        );

        if (data) {
          return {
            ...data,
            accessTokenExpires: Date.now() + tokenExpiration * 1000,
          } as any;
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async session({ token, session }: { session: Session; token: any }) {
      // session.user = token.user;
      session.accessToken = token.tokens.access_token;
      if (session?.accessToken ?? false) {
        const userDetails = await getRefreshedUser(token);

        session.user = userDetails.user;
        // session.user.name = `${userDetails.first_name} ${userDetails.last_name}`
      }

      // console.log("route-sesh,", session);
      // console.log("toks,", token);
      //@ts-ignore
      // delete session?.user?.userCode;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) return { ...user };
      if (Date.now() < (token as any).accessTokenExpires) return token;
      // Update session when user is updated
      // console.log("req", req);
      // if (req.url?.includes("/api/auth/session?update")) {
      //   console.log("find");
      //   return await getRefreshedUser(token);
      // }
      return await getRefreshedTokenPair(token);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
