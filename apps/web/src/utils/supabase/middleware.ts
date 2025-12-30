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

    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/auth') &&
        !request.nextUrl.pathname.startsWith('/c/') && // Public community pages
        !request.nextUrl.pathname.startsWith('/register') &&
        request.nextUrl.pathname !== '/'
    ) {
        // no user, potentially redirect to login
        // However, given our complex public/private route structure handled in Shell.tsx via client-side,
        // we might want to keep middleware simple for now or strictly protect /yntm/dashboard

        if (request.nextUrl.pathname.startsWith('/yntm') && !request.nextUrl.pathname.startsWith('/yntm/login')) {
            const url = request.nextUrl.clone()
            url.pathname = '/yntm/login'
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}
