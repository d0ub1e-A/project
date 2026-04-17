import { getRequestHeaders } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "#/lib/auth";
import { redirect } from "@tanstack/react-router";

const mockUser = {
    id: "string;",
    createdAt: new Date("2026-01-10"),
    updatedAt: Date.now(),
    email: "me@mail.com",
    emailVerified: true,
    name: "It's a me",
  };

export const getSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw redirect({ to: "/login" });
    }

    return session ?? mockUser;
  },
);
