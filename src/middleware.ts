import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/quiz/:path*",
    "/history/:path*",
    "/play/:path*",
    "/statistics/:path*",
  ],
};
