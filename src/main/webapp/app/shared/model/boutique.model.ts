import { Moment } from 'moment';
import { IPhoto } from 'app/shared/model/photo.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IBoutique {
  id?: number;
  adresse?: string;
  telephone?: number;
  created?: Moment;
  description?: any;
  photo?: IPhoto;
  administateur?: IUtilisateur;
  photos?: IPhoto[];
}

export class Boutique implements IBoutique {
  constructor(
    public id?: number,
    public adresse?: string,
    public telephone?: number,
    public created?: Moment,
    public description?: any,
    public photo?: IPhoto,
    public administateur?: IUtilisateur,
    public photos?: IPhoto[]
  ) {}
}
