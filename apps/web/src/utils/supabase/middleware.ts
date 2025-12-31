import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
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

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // PROTECTED ROUTE: /yntm (Admin Panel)
    if (request.nextUrl.pathname.startsWith('/yntm')) {
        const isLoginPage = request.nextUrl.pathname.startsWith('/yntm/login');

        // If trying to access protected admin pages without user -> Redirect to Login
        if (!user && !isLoginPage) {
            const url = request.nextUrl.clone()
            url.pathname = '/yntm/login'
            return NextResponse.redirect(url)
        }

        // If user is already logged in and tries to access login page -> Redirect to Dashboard
        if (user && isLoginPage) {
            const url = request.nextUrl.clone()
            url.pathname = '/yntm/dashboard'
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}
