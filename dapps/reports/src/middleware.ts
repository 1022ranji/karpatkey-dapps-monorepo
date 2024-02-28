import { APP_URL, PASSWORD_PROTECT } from './config/constants'
import { NextRequest, NextResponse } from 'next/server'

const isPasswordEnabled = !!PASSWORD_PROTECT
export async function middleware(req: NextRequest) {
  // Password protect middleware
  const isLoggedIn = !!req.cookies.has('login')
  const isPathPasswordProtect = req.nextUrl.pathname.startsWith('/password-protect')
  if (isPasswordEnabled && !isLoggedIn && !isPathPasswordProtect) {
    return NextResponse.redirect(new URL('/password-protect', req.url))
  }

  const url = req.nextUrl
  const { pathname } = url

  if (pathname.startsWith(`/api/`)) {
    if (!req.headers.get('referer')?.includes(APP_URL as string)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
}
