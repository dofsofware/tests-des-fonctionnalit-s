import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IBoutique, Boutique } from 'app/shared/model/boutique.model';
import { BoutiqueService } from './boutique.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IPhoto } from 'app/shared/model/photo.model';
import { PhotoService } from 'app/entities/photo/photo.service';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';

type SelectableEntity = IPhoto | IUtilisateur;

@Component({
  selector: 'jhi-boutique-update',
  templateUrl: './boutique-update.component.html',
})
export class BoutiqueUpdateComponent implements OnInit {
  isSaving = false;
  photos: IPhoto[] = [];
  administateurs: IUtilisateur[] = [];

  editForm = this.fb.group({
    id: [],
    adresse: [null, [Validators.required]],
    telephone: [null, [Validators.required]],
    created: [],
    description: [],
    photo: [],
    administateur: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected boutiqueService: BoutiqueService,
    protected photoService: PhotoService,
    protected utilisateurService: UtilisateurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ boutique }) => {
      if (!boutique.id) {
        const today = moment().startOf('day');
        boutique.created = today;
      }

      this.updateForm(boutique);

      this.photoService
        .query({ filter: 'boutique-is-null' })
        .pipe(
          map((res: HttpResponse<IPhoto[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPhoto[]) => {
          if (!boutique.photo || !boutique.photo.id) {
            this.photos = resBody;
          } else {
            this.photoService
              .find(boutique.photo.id)
              .pipe(
                map((subRes: HttpResponse<IPhoto>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPhoto[]) => (this.photos = concatRes));
          }
        });

      this.utilisateurService
        .query({ filter: 'boutique-is-null' })
        .pipe(
          map((res: HttpResponse<IUtilisateur[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUtilisateur[]) => {
          if (!boutique.administateur || !boutique.administateur.id) {
            this.administateurs = resBody;
          } else {
            this.utilisateurService
              .find(boutique.administateur.id)
              .pipe(
                map((subRes: HttpResponse<IUtilisateur>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IUtilisateur[]) => (this.administateurs = concatRes));
          }
        });
    });
  }

  updateForm(boutique: IBoutique): void {
    this.editForm.patchValue({
      id: boutique.id,
      adresse: boutique.adresse,
      telephone: boutique.telephone,
      created: boutique.created ? boutique.created.format(DATE_TIME_FORMAT) : null,
      description: boutique.description,
      photo: boutique.photo,
      administateur: boutique.administateur,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('wanterreApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const boutique = this.createFromForm();
    if (boutique.id !== undefined) {
      this.subscribeToSaveResponse(this.boutiqueService.update(boutique));
    } else {
      this.subscribeToSaveResponse(this.boutiqueService.create(boutique));
    }
  }

  private createFromForm(): IBoutique {
    return {
      ...new Boutique(),
      id: this.editForm.get(['id'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      created: this.editForm.get(['created'])!.value ? moment(this.editForm.get(['created'])!.value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description'])!.value,
      photo: this.editForm.get(['photo'])!.value,
      administateur: this.editForm.get(['administateur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBoutique>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
