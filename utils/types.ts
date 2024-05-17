import * as z from "zod";
export interface BtnProps {
  type?: string;
  title: string;
  animation?: string;
}

export interface User {
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
}

export type Credentials = {
  email: string;
  password: string;
};

export const loginSchema = z.object({
  email: z.string().email({
    message: "Provide appropriate Email.",
  }),
  password: z.string().min(4, {
    message: "password must be at least 2 characters.",
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "Provide appropriate Email.",
  }),
  password: z.string().min(4, {
    message: "password must be at least 2 characters.",
  }),
  username: z.string().min(3, {
    message: "username must be at least 3 characters.",
  }),
});

export const profileSchema = z.object({
  email: z.string().email({
    message: "Provide appropriate Email.",
  }),
  newPassword: z
    .string()
    .min(4, {
      message: "password must be at least 2 characters.",
    })
    .or(z.literal(""))
    .optional(),
  oldPassword: z
    .string()
    .min(4, {
      message: "old password must be at least 2 characters.",
    })
    .or(z.literal(""))
    .optional(),

  username: z.string().min(3, {
    message: "username must be at least 3 characters.",
  }),
});

export interface IUserState {
  user: any;
  isAuthenticated: boolean;
  accesstoken: string;
}

export interface IErrorState {
  data: {
    message: string; // Assuming message is a string
    // Other properties if available
  };
}

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
export type ProfileType = z.infer<typeof profileSchema>;
