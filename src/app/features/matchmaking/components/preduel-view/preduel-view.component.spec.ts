import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduelViewComponent } from './preduel-view.component';
import { provideHttpClient } from '@angular/common/http';

describe('PreduelViewComponent', () => {
  let component: PreduelViewComponent;
  let fixture: ComponentFixture<PreduelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreduelViewComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(PreduelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
