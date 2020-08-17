import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'photo',
        loadChildren: () => import('./photo/photo.module').then(m => m.WanterrePhotoModule),
      },
      {
        path: 'utilisateur',
        loadChildren: () => import('./utilisateur/utilisateur.module').then(m => m.WanterreUtilisateurModule),
      },
      {
        path: 'boutique',
        loadChildren: () => import('./boutique/boutique.module').then(m => m.WanterreBoutiqueModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class WanterreEntityModule {}
