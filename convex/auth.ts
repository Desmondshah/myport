import { convexAuth } from "@convex-dev/auth/server";
// The provider subpackage path has an incorrect index mapping in this version,
// so import directly from the built dist file.
// @ts-ignore - no type declarations at this exact path; shim provided separately.
import { Password } from "@convex-dev/auth/providers/Password";
// @ts-ignore - provider path
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password, Anonymous],
});
