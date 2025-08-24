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
  Presc = lazy(() =>
    import('../traitements/prescription/view/prescriptionView.tsx')),
  
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
  Fourn = lazy(() =>
    import('../stock/fournisseur/view/fournisseurView.tsx')),
  
  Struct = lazy(() =>
    import('../patients/structure/view/structureView.tsx')),
  
  CCaisses = lazy(() =>
    import('../finances/compteCaisse/view/compteCaisseView.tsx')),
  
  FactProd = lazy(() =>
    import('../stock/factureProduit/view/factureProduitView.tsx')),
  FactDocs = lazy(() =>
    import('../traitements/factureDocumentSuivi/view/factureDocumentSuiviView.tsx')),
  FactConsults = lazy(() =>
    import('../traitements/factureConsultation/view/factureConsultationView.tsx')),
  
  Receipts = lazy(() => import('../reception/view/receptionView.tsx')),
  NReceipt = lazy(() => import('../reception/view/newReception.tsx')),
  Rdvs = lazy(() => import('../rendezVous/view/rendezVousView.tsx')),
  NRdv = lazy(() => import('../rendezVous/view/newRdv.tsx')),
  
  Users = lazy(() => import('../user/view/userView.tsx')),
  NUser = lazy(() => import('../user/view/newUser.tsx')),
  EUser = lazy(() => import('../user/view/editUser.tsx'))

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
      
      // Fiches consultations (traitements)
      {
        path: 'types-des-fiches',
        element: <TFiches />
      },
      {
        path: 'prescriptions',
        element: <Presc />
      },
      // End Fiches consultations
      
      // Fonctions
      {
        path: 'fonctions',
        element: <Fonc />
      },
      // End Fonctions
      
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
      {
        path: 'fournisseurs',
        element: <Fourn />
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
      
      // factures
      {
        path: 'factures-produits',
        element: <FactProd />
      },
      {
        path: 'factures-traitements',
        element: <FactDocs />
      },
      {
        path: 'factures-consultations',
        element: <FactConsults />
      },
      // End factures
      
      // accueil
      {
        path: 'receptions',
        element: <Receipts />
      },
      {
        path: 'rendez-vous',
        element: <Rdvs />
      },
      {
        path: 'rendez-vous/new',
        element: <NRdv />
      },
      {
        path: 'receptions/new',
        element: <NReceipt />
      },
      // End accueil
      
      // accueil
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'users/new',
        element: <NUser />
      },
      {
        path: 'users/:id/:slug/edit',
        element: <EUser />
      },
      // End accueil
    ]
  },
]

export default pages
