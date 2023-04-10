import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensagemAlertaComponent } from './modal-mensagem-alerta.component';

describe('ModalMensagemAlertaComponent', () => {
  let component: ModalMensagemAlertaComponent;
  let fixture: ComponentFixture<ModalMensagemAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMensagemAlertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMensagemAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
