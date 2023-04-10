import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensagemFase3SucessComponent } from './modal-mensagem-fase3-sucess.component';

describe('ModalMensagemFase3SucessComponent', () => {
  let component: ModalMensagemFase3SucessComponent;
  let fixture: ComponentFixture<ModalMensagemFase3SucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMensagemFase3SucessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMensagemFase3SucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
