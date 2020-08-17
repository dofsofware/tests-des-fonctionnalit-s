import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBoutique, Boutique } from 'app/shared/model/boutique.model';
import { BoutiqueService } from './boutique.service';
import { BoutiqueComponent } from './boutique.component';
import { BoutiqueDetailComponent } from './boutique-detail.component';
import { BoutiqueUpdateComponent } from './boutique-update.component';

@Injectable({ providedIn: 'root' })
export class BoutiqueResolve implements Resolve<IBoutique> {
  constructor(private service: BoutiqueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBoutique> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((boutique: HttpResponse<Boutique>) => {
          if (boutique.body) {
            return of(boutique.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Boutique());
  }
}

export const boutiqueRoute: Routes = [
  {
    path: '',
    component: BoutiqueComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'wanterreApp.boutique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BoutiqueDetailComponent,
    resolve: {
      boutique: BoutiqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wanterreApp.boutique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BoutiqueUpdateComponent,
    resolve: {
      boutique: BoutiqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wanterreApp.boutique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BoutiqueUpdateComponent,
    resolve: {
      boutique: BoutiqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'wanterreApp.boutique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
