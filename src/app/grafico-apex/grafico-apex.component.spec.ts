import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoApexComponent } from './grafico-apex.component';

describe('GraficoApexComponent', () => {
  let component: GraficoApexComponent;
  let fixture: ComponentFixture<GraficoApexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoApexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoApexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
