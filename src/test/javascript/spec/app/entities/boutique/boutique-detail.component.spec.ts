import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { WanterreTestModule } from '../../../test.module';
import { BoutiqueDetailComponent } from 'app/entities/boutique/boutique-detail.component';
import { Boutique } from 'app/shared/model/boutique.model';

describe('Component Tests', () => {
  describe('Boutique Management Detail Component', () => {
    let comp: BoutiqueDetailComponent;
    let fixture: ComponentFixture<BoutiqueDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ boutique: new Boutique(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WanterreTestModule],
        declarations: [BoutiqueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BoutiqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BoutiqueDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load boutique on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.boutique).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
