// src/pages.tsx
import {JSX, lazy} from 'react'

type OutletType = {
  path: string
  index?: boolean
  element: JSX.Element
}

export type RouteType = {
  path: string
  routes: OutletType[]
}

const
  Auth = lazy(() => import('../auth/view/authView.tsx')),
  Dash = lazy(() => import('../dashboard/view/dashboardView.tsx')),
  Profil = lazy(() => import('../profil/view/profilView.tsx'))

const pages: RouteType[] = [
  {
    path: '/',
    routes: [
      {
        path: 'login',
        index: true,
        element: <Auth />
      }
    ]
  },
  {
    path: '/app',
    routes: [
      {
        path: 'dashboard',
        index: true,
        element: <Dash />
      },
      {
        path: 'profil',
        index: true,
        element: <Profil />
      },
    ]
  },
]

export default pages
