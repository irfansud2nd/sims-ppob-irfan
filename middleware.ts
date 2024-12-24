import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "./lib/auth/authActions";

const publicRoutes = ["/login", "/register"];
const isStaticPath = (path: string) =>
  path.startsWith("/_next/") ||
  path.startsWith("/static/") ||
  /\.(.*)$/.test(path);

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;

  if (isStaticPath(path)) {
    return NextResponse.next();
  }

  const session = await getServerSession();

  if (path == "/") {
    return NextResponse.redirect(
      new URL(session ? "/dashboard" : "login", req.nextUrl)
    );
  }

  const isPublicRoutes = publicRoutes.includes(path);

  if (!isPublicRoutes && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoutes && session) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
};

export default middleware;
