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
  Lits = lazy(() =>
    import('../traitements/lit/view/litView.tsx')),
  
  CatExams = lazy(() =>
    import('../traitements/categorieExam/view/categorieExamView.tsx')),

  TDocSuivi = lazy(() =>
    import('../traitements/typeDocSuivi/view/typeDocSuiviView.tsx')),
  
  TFiches = lazy(() =>
    import('../traitements/typeConsultation/view/typeConsultationView.tsx')),
  
  Fonc = lazy(() =>
    import('../personnel/fonction/view/fonctionView.tsx')),
  
  Serv = lazy(() =>
    import('../personnel/service/view/serviceView.tsx')),
  
  Depart = lazy(() =>
    import('../personnel/departement/view/departementView.tsx')),
  
  UCons = lazy(() =>
    import('../stock/uniteConsommation/view/uniteConsommationView.tsx')),
  
  CatProd = lazy(() =>
    import('../stock/categorieProduit/view/categorieProduitView.tsx')),
  
  Struct = lazy(() =>
    import('../patients/structure/view/structureView.tsx')),
  
  CCaisses = lazy(() =>
    import('../finances/compteCaisse/view/compteCaisseView.tsx'))

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
      {
        path: 'lits',
        element: <Lits />
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
      
      // Fiches consultations
      {
        path: 'fonctions',
        element: <Fonc />
      },
      // End Fiches consultations
      
      // Services
      {
        path: 'services',
        element: <Serv />
      },
      // End Services
      
      // Services
      {
        path: 'departements',
        element: <Depart />
      },
      // End Services
      
      // Services
      {
        path: 'unites-consommations',
        element: <UCons />
      },
      // End Services
      
      // produits
      {
        path: 'categories-produits',
        element: <CatProd />
      },
      // End produits
      
      // Structures
      {
        path: 'structures',
        element: <Struct />
      },
      // End Structures
      
      // comptes
      {
        path: 'comptes',
        element: <CCaisses />
      },
      // End comptes
    ]
  },
]

export default pages
