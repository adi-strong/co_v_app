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
  UConsult = lazy(() =>
    import('../traitements/consultation/view/showConsultation.tsx')),
  EConsult = lazy(() =>
    import('../traitements/consultation/view/editConsultation.tsx')),
  NConsult = lazy(() =>
    import('../traitements/consultation/view/newConsult.tsx')),
  Doc = lazy(() =>
    import('../traitements/documentSuivi/view/documentSuiviView.tsx')),
  NDoc = lazy(() =>
    import('../traitements/documentSuivi/view/newDocument.tsx')),
  EDoc = lazy(() =>
    import('../traitements/documentSuivi/view/editDocument.tsx')),
  UDoc = lazy(() =>
    import('../traitements/documentSuivi/view/showDocumentSuivi.tsx')),
  Labs = lazy(() =>
    import('../traitements/lab/view/labView.tsx')),
  ULab = lazy(() =>
    import('../traitements/lab/view/showLab.tsx')),
  Exams = lazy(() =>
    import('../traitements/examen/view/examenView.tsx')),
  Hosp = lazy(() =>
    import('../traitements/hospitalisation/view/hospitalisationView.tsx')),
  
  Fonc = lazy(() =>
    import('../personnel/fonction/view/fonctionView.tsx')),
  UFonc = lazy(() =>
    import('../personnel/fonction/view/showFonction.tsx')),
  
  Serv = lazy(() =>
    import('../personnel/service/view/serviceView.tsx')),
  UServ = lazy(() =>
    import('../personnel/service/view/showService.tsx')),
  
  Depart = lazy(() =>
    import('../personnel/departement/view/departementView.tsx')),
  UDepart = lazy(() =>
    import('../personnel/departement/view/showDepartement.tsx')),
  
  UCons = lazy(() =>
    import('../stock/uniteConsommation/view/uniteConsommationView.tsx')),
  
  UCon = lazy(() =>
    import('../stock/uniteConsommation/view/showUniteConsommation.tsx')),
  
  CatProd = lazy(() =>
    import('../stock/categorieProduit/view/categorieProduitView.tsx')),
  UCatProd = lazy(() =>
    import('../stock/categorieProduit/view/showCategoryProduit.tsx')),
  Fourn = lazy(() =>
    import('../stock/fournisseur/view/fournisseurView.tsx')),
  Prod = lazy(() =>
    import('../stock/produit/view/produitView.tsx')),
  UProd = lazy(() =>
    import('../stock/produit/view/showProduit.tsx')),
  LotProd = lazy(() =>
    import('../stock/lotProduit/view/lotProdView.tsx')),
  NProd = lazy(() =>
    import('../stock/produit/view/newProduit.tsx')),
  Appro = lazy(() =>
    import('../stock/appro/view/approView.tsx')),
  UAppro = lazy(() =>
    import('../stock/appro/view/showAppro.tsx')),
  NAppro = lazy(() =>
    import('../stock/appro/view/newAppro.tsx')),
  MoveStk = lazy(() =>
    import('../stock/sortieProduit/view/sortieProduitView.tsx')),
  Perte = lazy(() =>
    import('../stock/perteProduit/view/rapportsProduitView.tsx')),
  Vente = lazy(() =>
    import('../stock/sortieProduit/view/newVente.tsx')),
  
  Struct = lazy(() =>
    import('../patients/structure/view/structureView.tsx')),
  UStruct = lazy(() =>
    import('../patients/structure/view/showStructure.tsx')),
  Pat = lazy(() =>
    import('../patients/patient/view/patientView.tsx')),
  NPat = lazy(() =>
    import('../patients/patient/view/newPatient.tsx')),
  EPat = lazy(() =>
    import('../patients/patient/view/editPatient.tsx')),
  UPat = lazy(() =>
    import('../patients/patient/view/showPatient.tsx')),
  
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
  EAgent = lazy(() => import('../personnel/agent/view/editAgent.tsx')),
  UAgent = lazy(() => import('../personnel/agent/view/showAgent.tsx')),
  
  Treats = lazy(() =>
    import('../traitements/traitement/view/traitementView.tsx')),
  
  Bdp = lazy(() =>
    import('../finances/bonDeDepenses/view/bonDeDepensesView.tsx')),
  UBdp = lazy(() =>
    import('../finances/bonDeDepenses/view/showBonDeDepense.tsx'))

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
        path: 'consultations/:id',
        element: <UConsult />
      },
      {
        path: 'unites-consommations/:id/:slug',
        element: <UCon />
      },
      {
        path: 'consultations/:id/edit',
        element: <EConsult />
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
        path: 'suivis/:id/edit',
        element: <EDoc />
      },
      {
        path: 'suivis/:id',
        element: <UDoc />
      },
      {
        path: 'labs',
        element: <Labs />
      },
      {
        path: 'labs/:id',
        element: <ULab />
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
      {
        path: 'fonctions/:id/:slug',
        element: <UFonc />
      },
      // End Fonctions
      
      // Services
      {
        path: 'services',
        element: <Serv />
      },
      {
        path: 'services/:id/:slug',
        element: <UServ />
      },
      // End Services
      
      // Services
      {
        path: 'departements',
        element: <Depart />
      },
      {
        path: 'departements/:id/:slug',
        element: <UDepart />
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
        path: 'categories-produits/:id/:slug',
        element: <UCatProd />
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
        path: 'produits/:id/:slug',
        element: <UProd />
      },
      {
        path: 'produits/articles',
        element: <LotProd />
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
        path: 'approvisionnements/:id',
        element: <UAppro />
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
        path: 'rapports-stock',
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
        path: 'structures/:id/:slug',
        element: <UStruct />
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
      {
        path: 'patients/:id/:slug',
        element: <UPat />
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
      {
        path: 'agents/:id/:slug',
        element: <UAgent />
      },
      // End agents
      
      // Traitements
      {
        path: 'traitements',
        element: <Treats />
      },
      // End Traitements
      
      // Finances
      {
        path: 'bons-des-depenses',
        element: <Bdp />
      },
      {
        path: 'bons-des-depenses/:id/:slug',
        element: <UBdp />
      },
      // End Finances
    ]
  },
]

export default pages
