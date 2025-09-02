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
  UCatLit = lazy(() =>
    import('../traitements/categorieLit/view/showCategorieLit.tsx')),
  Lits = lazy(() =>
    import('../traitements/lit/view/litView.tsx')),
  
  CatExams = lazy(() =>
    import('../traitements/categorieExam/view/categorieExamView.tsx')),
  UCatExam = lazy(() =>
    import('../traitements/categorieExam/view/showCategorieExam.tsx')),

  TDocSuivi = lazy(() =>
    import('../traitements/typeDocSuivi/view/typeDocSuiviView.tsx')),
  
  TFiches = lazy(() =>
    import('../traitements/typeConsultation/view/typeConsultationView.tsx')),
  Presc = lazy(() =>
    import('../traitements/prescription/view/prescriptionView.tsx')),
  ShowPresc = lazy(() =>
    import('../traitements/prescription/view/showPrescription.tsx')),
  Consult = lazy(() =>
    import('../traitements/consultation/view/consultationView.tsx')),
  NConsult = lazy(() =>
    import('../traitements/consultation/view/newConsult.tsx')),
  Doc = lazy(() =>
    import('../traitements/documentSuivi/view/documentSuiviView.tsx')),
  NDoc = lazy(() =>
    import('../traitements/documentSuivi/view/newDocument.tsx')),
  Labs = lazy(() =>
    import('../traitements/lab/view/labView.tsx')),
  Exams = lazy(() =>
    import('../traitements/examen/view/examenView.tsx')),
  Hosp = lazy(() =>
    import('../traitements/hospitalisation/view/hospitalisationView.tsx')),
  
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
  Prod = lazy(() =>
    import('../stock/produit/view/produitView.tsx')),
  NProd = lazy(() =>
    import('../stock/produit/view/newProduit.tsx')),
  Appro = lazy(() =>
    import('../stock/appro/view/approView.tsx')),
  NAppro = lazy(() =>
    import('../stock/appro/view/newAppro.tsx')),
  MoveStk = lazy(() =>
    import('../stock/sortieProduit/view/sortieProduitView.tsx')),
  Perte = lazy(() =>
    import('../stock/perteProduit/view/perteProduitView.tsx')),
  Vente = lazy(() =>
    import('../stock/sortieProduit/view/newVente.tsx')),
  
  Struct = lazy(() =>
    import('../patients/structure/view/structureView.tsx')),
  Pat = lazy(() =>
    import('../patients/patient/view/patientView.tsx')),
  NPat = lazy(() =>
    import('../patients/patient/view/newPatient.tsx')),
  EPat = lazy(() =>
    import('../patients/patient/view/editPatient.tsx')),
  
  CCaisses = lazy(() =>
    import('../finances/compteCaisse/view/compteCaisseView.tsx')),
  
  FactProd = lazy(() =>
    import('../stock/factureProduit/view/factureProduitView.tsx')),
  ProdInv = lazy(() =>
    import('../stock/factureProduit/view/productInvoiceView.tsx')),
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
  EUser = lazy(() => import('../user/view/editUser.tsx')),
  
  IGen = lazy(() => import('../configs/infosGen/view/infosGenView.tsx')),
  
  Agents = lazy(() => import('../personnel/agent/view/agentView.tsx')),
  NAgent = lazy(() => import('../personnel/agent/view/newAgent.tsx')),
  EAgent = lazy(() => import('../personnel/agent/view/editAgent.tsx'))

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
        path: 'categories-lits/:id/:slug',
        element: <UCatLit />
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
      {
        path: 'categories-examens/:id/:slug',
        element: <UCatExam />
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
      {
        path: 'prescriptions/:id',
        element: <ShowPresc />
      },
      {
        path: 'consultations',
        element: <Consult />
      },
      {
        path: 'consultations/new',
        element: <NConsult />
      },
      {
        path: 'suivis',
        element: <Doc />
      },
      {
        path: 'suivis/new',
        element: <NDoc />
      },
      {
        path: 'labs',
        element: <Labs />
      },
      {
        path: 'examens',
        element: <Exams />
      },
      {
        path: 'hospitalisations',
        element: <Hosp />
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
      {
        path: 'produits',
        element: <Prod />
      },
      {
        path: 'produits/new',
        element: <NProd />
      },
      {
        path: 'approvisionnements',
        element: <Appro />
      },
      {
        path: 'approvisionnements/new',
        element: <NAppro />
      },
      {
        path: 'mouvements-stocks',
        element: <MoveStk />
      },
      {
        path: 'pertes-produits',
        element: <Perte />
      },
      {
        path: 'produits/vente',
        element: <Vente />
      },
      // End produits
      
      // patients
      {
        path: 'structures',
        element: <Struct />
      },
      {
        path: 'patients',
        element: <Pat />
      },
      {
        path: 'patients/new',
        element: <NPat />
      },
      {
        path: 'patients/:id/:slug/edit',
        element: <EPat />
      },
      // End patients
      
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
        path: 'factures-des-produits',
        element: <ProdInv />
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
      
      // users
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
      // End users
      
      // paramètres
      {
        path: 'params',
        element: <IGen />
      },
      // End paramètres
      
      // agents
      {
        path: 'agents',
        element: <Agents />
      },
      {
        path: 'agents/new',
        element: <NAgent />
      },
      {
        path: 'agents/:id/:slug/edit',
        element: <EAgent />
      },
      // End agents
    ]
  },
]

export default pages
