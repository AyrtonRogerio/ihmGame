import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseFuncaoHardComponent } from './fase-funcao-hard.component';

describe('FaseFuncaoHardComponent', () => {
  let component: FaseFuncaoHardComponent;
  let fixture: ComponentFixture<FaseFuncaoHardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaseFuncaoHardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaseFuncaoHardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
