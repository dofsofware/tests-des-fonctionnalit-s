import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBoutique } from 'app/shared/model/boutique.model';

type EntityResponseType = HttpResponse<IBoutique>;
type EntityArrayResponseType = HttpResponse<IBoutique[]>;

@Injectable({ providedIn: 'root' })
export class BoutiqueService {
  public resourceUrl = SERVER_API_URL + 'api/boutiques';

  constructor(protected http: HttpClient) {}

  create(boutique: IBoutique): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(boutique);
    return this.http
      .post<IBoutique>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(boutique: IBoutique): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(boutique);
    return this.http
      .put<IBoutique>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBoutique>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBoutique[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(boutique: IBoutique): IBoutique {
    const copy: IBoutique = Object.assign({}, boutique, {
      created: boutique.created && boutique.created.isValid() ? boutique.created.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created ? moment(res.body.created) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((boutique: IBoutique) => {
        boutique.created = boutique.created ? moment(boutique.created) : undefined;
      });
    }
    return res;
  }
}
