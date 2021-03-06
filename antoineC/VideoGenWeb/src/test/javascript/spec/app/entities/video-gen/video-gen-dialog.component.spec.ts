/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VideoGenWebTestModule } from '../../../test.module';
import { VideoGenDialogComponent } from '../../../../../../main/webapp/app/entities/video-gen/video-gen-dialog.component';
import { VideoGenService } from '../../../../../../main/webapp/app/entities/video-gen/video-gen.service';
import { VideoGen } from '../../../../../../main/webapp/app/entities/video-gen/video-gen.model';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('VideoGen Management Dialog Component', () => {
        let comp: VideoGenDialogComponent;
        let fixture: ComponentFixture<VideoGenDialogComponent>;
        let service: VideoGenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VideoGenWebTestModule],
                declarations: [VideoGenDialogComponent],
                providers: [
                    UserService,
                    VideoGenService
                ]
            })
            .overrideTemplate(VideoGenDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VideoGenDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoGenService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VideoGen(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.videoGen = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'videoGenListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VideoGen();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.videoGen = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'videoGenListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
