import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBoutique } from 'app/shared/model/boutique.model';
import { BoutiqueService } from './boutique.service';

@Component({
  templateUrl: './boutique-delete-dialog.component.html',
})
export class BoutiqueDeleteDialogComponent {
  boutique?: IBoutique;

  constructor(protected boutiqueService: BoutiqueService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.boutiqueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('boutiqueListModification');
      this.activeModal.close();
    });
  }
}
