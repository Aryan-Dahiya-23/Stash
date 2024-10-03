// middleware.ts


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import Cookies from 'js-cookie';

// export async function middleware(request: NextRequest) {
//   const publicRoutes = ['/import', '/create', "/"]; 
//   const privateRoutes = ['/wallet', '/dashboard']; 

//   const privateKey = request.cookies.get('solanaEncryptedPrivateKey');
//   const temp = request.cookies.get('mnemonic');


//   // const privateKeyFromCookies = Cookies.get('solanaEncryptedPrivateKey');
  
//   // const privateKeyFromSession =  Cookies.get('mnemonic'); 

//   console.log(privateKey)
//   console.log(temp)
//   // console.log(privateKey);

//   const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname === route);

//   const isPrivateRoute = privateRoutes.some((route) => request.nextUrl.pathname === route);

//   if (isPrivateRoute  && !privateKey) {
//     return NextResponse.redirect(new URL('/import', request.url));
//   }

//   if (isPublicRoute && privateKey) {
//     return NextResponse.redirect(new URL('/wallet', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const publicRoutes = ['/import', '/create', '/']; 
//   const privateRoutes = ['/wallet']; 

//   const privateKeyFromCookies = request.cookies.get('encryptedData');
  
//   const privateKeyFromSession =  request.cookies.get('privateKey');

//   const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname === route);
//   const isPrivateRoute = privateRoutes.some((route) => request.nextUrl.pathname === route);

//   if (isPrivateRoute) {
//     console.log("private route")
//     if (!privateKeyFromCookies && !privateKeyFromSession) {
//       return NextResponse.redirect(new URL('/', request.url));
//     } else if (!privateKeyFromSession && privateKeyFromCookies) {
//       return NextResponse.redirect(new URL('/verify', request.url));
//     }
//     else{
//       return NextResponse.next();
//     }
//   }

//   if (isPublicRoute && privateKeyFromCookies) {
//     console.log("public route")
//     return NextResponse.redirect(new URL('/verify', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const publicRoutes = ['/import', '/create', '/']; 
  const privateRoutes = ['/wallet']; 
  const verifyRoute = '/verify'; 

  const privateKeyFromCookies = request.cookies.get('encryptedData');
  const privateKeyFromSession = request.cookies.get('privateKey');

  const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname === route);
  const isPrivateRoute = privateRoutes.some((route) => request.nextUrl.pathname === route);
  const isVerifyRoute = request.nextUrl.pathname === verifyRoute; 

  if (isPrivateRoute) {
    if (!privateKeyFromCookies && !privateKeyFromSession) {
      return NextResponse.redirect(new URL('/', request.url));
    } else if (!privateKeyFromSession && privateKeyFromCookies) {
      return NextResponse.redirect(new URL(verifyRoute, request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (isPublicRoute && privateKeyFromCookies) {
    return NextResponse.redirect(new URL(verifyRoute, request.url)); 
  }

  if (isVerifyRoute && !privateKeyFromCookies) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  else if(isVerifyRoute && privateKeyFromSession){
    return NextResponse.redirect(new URL('/wallet', request.url));    
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
