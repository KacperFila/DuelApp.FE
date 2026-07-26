import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentLeavedDialogComponent } from './opponent-leaved-dialog.component';

describe('OpponentLeavedDialogComponent', () => {
  let component: OpponentLeavedDialogComponent;
  let fixture: ComponentFixture<OpponentLeavedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpponentLeavedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpponentLeavedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
