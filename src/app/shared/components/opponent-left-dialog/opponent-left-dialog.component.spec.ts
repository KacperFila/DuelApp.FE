import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { OpponentLeftDialogComponent } from './opponent-left-dialog.component';
import { DuelsService } from '../../../features/duel/services/duels.service';

describe('OpponentLeftDialogComponent', () => {
  let component: OpponentLeftDialogComponent;
  let fixture: ComponentFixture<OpponentLeftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpponentLeftDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpponentLeftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
