import type {LotProduit} from "../../lotProduit/model/lotProduitService.ts";
import type {NumLot} from "../../numLot/model/numLotService.ts";
import type {Produit} from "../../produit/model/produitService.ts";
import type {User} from "../../../user/model/userService.ts";
import type {Fournisseur} from "../../fournisseur/model/fournisseurService.ts";
import type {Appro} from "../../appro/model/approService.ts";
import type {THeadItemType} from "../../../../services/services.ts";

// INTERFACES OR TYPES
export interface PerteProduit {
  '@id': string
  id: 0
  quantite: 0
  tva: number
  prixHt: number
  prixTtc: number
  dateAppro: string
  datePeremption?: string
  fkAppro: Appro
  fkFournisseur: Fournisseur
  fkUser?: User
  fkProduit: Produit
  fkNumLot: NumLot
  fkLotProduit: LotProduit
  releasedAt?: string
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
export const getPerteHeadItems = (): THeadItemType[] => [
  { th: 'Qté.' },
  { th: 'TVA' },
  { th: 'Prix HT' },
  { th: 'Prix TTC' },
  { th: 'Total HT' },
  { th: 'Total TTC' },
  { th: 'Total TVA' },
]
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
