import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
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

  // Define protected and auth URLs
  const protectedUrls = ['/buy-ticket'] 
  const adminUrls = ['/admin', '/verify']  
  const authUrls = ['/login', '/signup']

  // Get the user session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is not authenticated and trying to access a protected or admin URL
  if (!user && [...protectedUrls, ...adminUrls].some(url => request.nextUrl.pathname.startsWith(url))) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  // Check if user is trying to access an admin URL
  if (user && adminUrls.some(url => request.nextUrl.pathname.startsWith(url))) {
    const { data: userProfile } = await supabase
      .from('profiles') // Adjust table name if needed
      .select('role')  // Assuming the role field exists in the profile
      .eq('id', user.id) // Match the profile to the current user
      .single()

    // Redirect if user does not have the admin role
    if (userProfile?.role !== 'admin') {
      const unauthorizedUrl = request.nextUrl.clone()
      unauthorizedUrl.pathname = '/'
      return NextResponse.redirect(unauthorizedUrl)
    }
  }

  // Prevent authenticated users from visiting auth pages (e.g., login/signup)
  if (user && authUrls.some(url => request.nextUrl.pathname.startsWith(url))) {
    const homeUrl = request.nextUrl.clone()
    homeUrl.pathname = '/'
    return NextResponse.redirect(homeUrl)
  }

  // Return the supabaseResponse object
  return supabaseResponse
}
