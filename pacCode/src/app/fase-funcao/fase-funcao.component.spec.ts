import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseFuncaoComponent } from './fase-funcao.component';

describe('FaseFuncaoComponent', () => {
  let component: FaseFuncaoComponent;
  let fixture: ComponentFixture<FaseFuncaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaseFuncaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaseFuncaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
