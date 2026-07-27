import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonDuelDialogComponent } from './abandon-duel-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';

describe('AbandonDuelDialogComponent', () => {
  let component: AbandonDuelDialogComponent;
  let fixture: ComponentFixture<AbandonDuelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbandonDuelDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AbandonDuelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
