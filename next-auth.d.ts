// import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

// export type ExtendedUser = DefaultSession["user"] & {
//   role: UserRole;
// };

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      _id: string;
      username: string;
      email: string;
      password: string;
      role: string;
      isPauseSub: boolean;
      isActiveSub: boolean;
      pauseCount: number;
      activeSubType: number;
      userCode: string;
    };
  }
}
