import type {SaveUser, User} from "../model/userService.ts";
import type {Dispatch, SetStateAction} from "react";
import {useEffect} from "react";
import type {SelectOptionType} from "../../../services/services.ts";
import {initUserRoles} from "../model/userService.ts";

export default function useSetUserData(data?: User, setUser?: Dispatch<SetStateAction<SaveUser>>): void {
  
  useEffect(() => {
    if (data && setUser) {
      let roles: SelectOptionType[] = []
      const rolesAllowed: string[] = initUserRoles()
      
      for (let i: number = 0; i < data.roles.length - 1; i++) {
        const role: string = data.roles[i]
        if (rolesAllowed.includes(role)) {
          switch (role) {
            case 'ROLE_RECEPTIONNISTE':
              roles.push({ label: 'Réceptionniste', value: 'Réceptionniste', data: 'ROLE_RECEPTIONNISTE' })
              break
            case 'ROLE_PHAR':
              roles.push({ label: 'Pharmacien', value: 'Pharmacien', data: 'ROLE_PHAR' })
              break
            case 'ROLE_LAB':
              roles.push({ label: 'Laborantin', value: 'Laborantin', data: 'ROLE_LAB' })
              break
            case 'ROLE_INFIRMIER':
              roles.push({ label: 'Infirmier', value: 'Infirmier', data: 'ROLE_INFIRMIER' })
              break
            case 'ROLE_MEDECIN':
              roles.push({ label: 'Médecin', value: 'Médecin', data: 'ROLE_MEDECIN' })
              break
            case 'ROLE_MEDECIN_DIRECTEUR':
              roles.push({ label: 'Médecin directeur', value: 'Médecin directeur', data: 'ROLE_MEDECIN_DIRECTEUR' })
              break
            case 'ROLE_ADMIN':
              roles.push({ label: 'Administrateur', value: 'Administrateur', data: 'ROLE_ADMIN' })
              break
            case 'ROLE_SUPER_ADMIN':
              roles.push({ label: 'Super Administrateur', value: 'Super Administrateur', data: 'ROLE_SUPER_ADMIN' })
              break
            default:
              break
          }
        }
      }
      
      setUser(prev => ({
        ...prev,
        id: data.id,
        active: data.active,
        tel: data.tel,
        username: data.username,
        email: data?.email ?? '',
        fullName: data.fullName,
        roles,
        // fkAgent,
      }))
    }
  }, [data, setUser]);
  
}
