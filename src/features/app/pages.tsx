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
  Profil = lazy(() => import('../profil/view/profilView.tsx')),
  
  CatLits = lazy(() =>
    import('../traitements/categorieLit/view/categorieLitView.tsx')),
  
  CatExams = lazy(() =>
    import('../traitements/categorieExam/view/categorieExamView.tsx')),

  TDocSuivi = lazy(() =>
    import('../traitements/typeDocSuivi/view/typeDocSuiviView.tsx')),
  
  TFiches = lazy(() =>
    import('../traitements/typeConsultation/view/typeConsultationView.tsx'))

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
        element: <Dash />
      },
      {
        path: 'profil',
        index: true,
        element: <Profil />
      },
      
      // Lits
      {
        path: 'categories-lits',
        element: <CatLits />
      },
      // End Lits
      
      // Examens
      {
        path: 'categories-examens',
        element: <CatExams />
      },
      // End Examens
      
      // Doc suivi
      {
        path: 'types-documents-suivis',
        element: <TDocSuivi />
      },
      // End Doc suivi
      
      // Fiches consultations
      {
        path: 'types-des-fiches',
        element: <TFiches />
      },
      // End Fiches consultations
    ]
  },
]

export default pages
