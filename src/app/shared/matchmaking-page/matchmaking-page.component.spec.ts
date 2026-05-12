import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakingPageComponent } from './matchmaking-page.component';

describe('MatchmakingPageComponent', () => {
  let component: MatchmakingPageComponent;
  let fixture: ComponentFixture<MatchmakingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchmakingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchmakingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
