export default function ({ app, route, redirect }) {
  const unprotectedRoutes = ['/auth/register'] // routes that aren't protected
  if (unprotectedRoutes.includes(route.path)) {
    return // let's the guest access these routes
  }
  if (route.path !== '/') {
    // we are on a protected route
    if (!app.$fire.auth.currentUser) {
      // take them to sign in page
      return redirect('/')
    }
  } else if (route.path === '/') {
    if (!app.$fire.auth.currentUser) {
      // leave them on the sign in page
    } else {
      return redirect('/dashboard/myboards')
    }
  }
}
