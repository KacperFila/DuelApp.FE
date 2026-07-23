import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelSummaryComponent } from './duel-summary.component';

describe('DuelSummaryComponent', () => {
  let component: DuelSummaryComponent;
  let fixture: ComponentFixture<DuelSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuelSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuelSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
