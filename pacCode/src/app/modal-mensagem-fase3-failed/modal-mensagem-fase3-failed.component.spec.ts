import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensagemFase3FailedComponent } from './modal-mensagem-fase3-failed.component';

describe('ModalMensagemFase3FailedComponent', () => {
  let component: ModalMensagemFase3FailedComponent;
  let fixture: ComponentFixture<ModalMensagemFase3FailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMensagemFase3FailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMensagemFase3FailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
