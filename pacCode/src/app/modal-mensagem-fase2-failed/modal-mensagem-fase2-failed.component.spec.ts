import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensagemFase2FailedComponent } from './modal-mensagem-fase2-failed.component';

describe('ModalMensagemFase2FailedComponent', () => {
  let component: ModalMensagemFase2FailedComponent;
  let fixture: ComponentFixture<ModalMensagemFase2FailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMensagemFase2FailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMensagemFase2FailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
