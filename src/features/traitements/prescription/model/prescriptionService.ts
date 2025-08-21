import type {Produit} from "../../../stock/produit/model/produitService.ts";
import type {LotProduit} from "../../../stock/lotProduit/model/lotProduitService.ts";
import type {Agent} from "../../../personnel/agent/model/agentService.ts";
import type {Examen} from "../../examen/model/examenService.ts";
import type {User} from "../../../user/model/userService.ts";
import type {Patient} from "../../../patients/patient/model/patientService.ts";
import type {Consultation} from "../../consultation/model/consultationService.ts";
import type {DocumentSuivi} from "../../documentSuivi/model/documentSuiviService.ts";
  
// INTERFACES OR TYPES
export interface ExamenPrescrit {
  '@id'?: string
  id: number
  fkExam: Examen
  prixHt: number
  prixTtc: number
}

export interface ProduitPrescrit {
  '@id'?: string
  id: number
  fkProduit: Produit
  quantite: number
  fkLot: LotProduit
  prixHt: number
  prixTtc: number
}

export interface AutreProduit {
  fkProduit: Produit
  quantite: number
  fkLot: LotProduit
  prixHt: number
  prixTtc: number
}

export interface Prescription {
  '@id'?: string
  id: number
  fkAgent: Agent
  fkPatient: Patient
  fkUser?: User
  fkConsultation?: Consultation
  fkDocSuivi?: DocumentSuivi
  produitPrescrits: ProduitPrescrit[]
  releasedAt?: string
  updatedAt?: string
  autresProduits: AutreProduit[]
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
