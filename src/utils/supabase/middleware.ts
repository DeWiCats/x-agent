import { createServerClient } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  const { data } = await supabase.auth.getUser()

  console.log(request.url);
  console.log(data.user);

  if (!data.user && (!request.url.includes('/login') && !request.url.includes('/api/auth/confirm'))) {
    console.log('redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (data.user && request.url.includes('/login')) {
    console.log('redirecting to home');
    return NextResponse.redirect(new URL('/', request.url))
  }

  return supabaseResponse
}