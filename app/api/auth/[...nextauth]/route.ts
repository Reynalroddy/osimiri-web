import {
  getRefreshedTokenPair,
  getRefreshedUser,
  loginOrRegisterUser,
} from "@/lib/api";
import NextAuth, { Session } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
const tokenExpiration = 60 * 60 * 24;
// const tokenExpiration = 60 * 1;
type Credentials = {
  email: string;
  password: string;
};

async function auth(req: NextRequest, res: any) {
  return await NextAuth(req, res, {
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
    pages: {
      signIn: "/",
      signOut: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}

export { auth as GET, auth as POST };

// export const authOptions: AuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const data = await loginOrRegisterUser(
//           credentials?.email,
//           credentials?.password
//         );

//         if (data) {
//           return {
//             ...data,
//             accessTokenExpires: Date.now() + tokenExpiration * 1000,
//           } as any;
//         }
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//     signOut: "/",
//   },
//   callbacks: {
//     async session({ token, session }: { session: Session; token: any }) {
//       session.user = token.user;
//       session.accessToken = token.tokens.access_token;
//       console.log("route-sesh,", session);
//       console.log("toks,", token);

//       return session;
//     },
//     async jwt({ token, user, trigger, session }: any) {
//       if (user) return { ...user };

//       if (Date.now() < (token as any).accessTokenExpires) return token;

//       return await getRefreshedTokenPair(token);
//     },
//   },
// };

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
