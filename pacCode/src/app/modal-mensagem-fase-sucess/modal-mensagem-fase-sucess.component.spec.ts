import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensagemFaseSucessComponent } from './modal-mensagem-fase-sucess.component';

describe('ModalMensagemFaseSucessComponent', () => {
  let component: ModalMensagemFaseSucessComponent;
  let fixture: ComponentFixture<ModalMensagemFaseSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMensagemFaseSucessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMensagemFaseSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
