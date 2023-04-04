import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensagemFaseFailedComponent } from './modal-mensagem-fase-failed.component';

describe('ModalMensagemFaseFailedComponent', () => {
  let component: ModalMensagemFaseFailedComponent;
  let fixture: ComponentFixture<ModalMensagemFaseFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMensagemFaseFailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMensagemFaseFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
