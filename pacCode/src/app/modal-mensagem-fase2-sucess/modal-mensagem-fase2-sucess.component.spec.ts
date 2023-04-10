import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensagemFase2SucessComponent } from './modal-mensagem-fase2-sucess.component';

describe('ModalMensagemFase2SucessComponent', () => {
  let component: ModalMensagemFase2SucessComponent;
  let fixture: ComponentFixture<ModalMensagemFase2SucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMensagemFase2SucessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMensagemFase2SucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
