import { authClient } from "@/lib/auth-client"; // import the auth client

export function User() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  return <></>;
}
