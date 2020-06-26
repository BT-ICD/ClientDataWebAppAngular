import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDocumentEditComponent } from './project-document-edit.component';

describe('ProjectDocumentEditComponent', () => {
  let component: ProjectDocumentEditComponent;
  let fixture: ComponentFixture<ProjectDocumentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDocumentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDocumentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
