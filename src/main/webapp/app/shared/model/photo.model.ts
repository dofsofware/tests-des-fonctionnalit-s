import { Moment } from 'moment';
import { IBoutique } from 'app/shared/model/boutique.model';

export interface IPhoto {
  id?: number;
  name?: string;
  imageContentType?: string;
  image?: any;
  description?: string;
  url?: string;
  created?: Moment;
  boutique?: IBoutique;
}

export class Photo implements IPhoto {
  constructor(
    public id?: number,
    public name?: string,
    public imageContentType?: string,
    public image?: any,
    public description?: string,
    public url?: string,
    public created?: Moment,
    public boutique?: IBoutique
  ) {}
}
