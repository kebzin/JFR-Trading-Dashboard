const { createMiddlewareClient } = require("@supabase/auth-helpers-nextjs");
const { NextResponse } = require("next/server");

export async function middleware(req) {
  const res = NextResponse.next();
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });
  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || session.expired || session === null) {
    return NextResponse.rewrite(new URL("/auth", req.url));
  }

  // // Ensure the middleware is only called for relevant paths.
  // if (req.nextUrl.pathname.startsWith(config.matcher[0])) {
  //   return res;
  // }

  return res;
}

// config
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    "/((?!_next/static|_next/image|favicon.ico/).*)",

    // "https://ndlmecmfbncfwyyazuwy.supabase.co/storage/v1/object/public/product-images/product-images",
  ],
};
//  (https://ndlmecmfbncfwyyazuwy.supabase.co/storage/v1/object/public/product-images/product-images/1712401683809.png)
