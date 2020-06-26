import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDocumentAddComponent } from './project-document-add.component';

describe('ProjectDocumentAddComponent', () => {
  let component: ProjectDocumentAddComponent;
  let fixture: ComponentFixture<ProjectDocumentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDocumentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDocumentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
