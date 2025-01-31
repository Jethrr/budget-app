import { authClient } from "@/lib/auth-client"; // import the auth client

export function getUser() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  return session;
}
