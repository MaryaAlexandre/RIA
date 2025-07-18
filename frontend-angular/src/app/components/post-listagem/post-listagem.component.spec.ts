import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListagemComponent } from './post-listagem.component';

describe('PostListagemComponent', () => {
  let component: PostListagemComponent;
  let fixture: ComponentFixture<PostListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
