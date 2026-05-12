import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakingPageComponent } from './matchmaking-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('MatchmakingPageComponent', () => {
  let component: MatchmakingPageComponent;
  let fixture: ComponentFixture<MatchmakingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchmakingPageComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchmakingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
