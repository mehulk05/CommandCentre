import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignleadsComponent } from './campaignleads.component';

describe('CampaignleadsComponent', () => {
  let component: CampaignleadsComponent;
  let fixture: ComponentFixture<CampaignleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignleadsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
