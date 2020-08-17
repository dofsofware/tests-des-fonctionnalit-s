import { IPhoto } from 'app/shared/model/photo.model';
import { IUser } from 'app/core/user/user.model';
import { Sexe } from 'app/shared/model/enumerations/sexe.model';

export interface IUtilisateur {
  id?: number;
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: number;
  sexe?: Sexe;
  photos?: IPhoto;
  user?: IUser;
}

export class Utilisateur implements IUtilisateur {
  constructor(
    public id?: number,
    public prenom?: string,
    public nom?: string,
    public email?: string,
    public telephone?: number,
    public sexe?: Sexe,
    public photos?: IPhoto,
    public user?: IUser
  ) {}
}
