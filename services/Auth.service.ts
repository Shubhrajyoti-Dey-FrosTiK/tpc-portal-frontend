import axios from "axios";
import { useRouter } from "next/router";

// Routes
import { UNAUTHENTICATED_ROUTES } from "../routes.js";

export class AuthService {
  router = useRouter();

  async checkLoggedIn(token: string) {
    return (
      await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
        headers: {
          token,
        },
      })
    ).data;
  }

  manageRoute(loggedIn: boolean) {
    if (loggedIn && UNAUTHENTICATED_ROUTES[this.router.pathname]) {
      this.router.push("/home");
    } else if (!loggedIn && !UNAUTHENTICATED_ROUTES[this.router.pathname]) {
      this.router.push("/");
    }
  }
}
