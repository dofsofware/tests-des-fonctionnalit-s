import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IBoutique } from 'app/shared/model/boutique.model';

@Component({
  selector: 'jhi-boutique-detail',
  templateUrl: './boutique-detail.component.html',
})
export class BoutiqueDetailComponent implements OnInit {
  boutique: IBoutique | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ boutique }) => (this.boutique = boutique));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
