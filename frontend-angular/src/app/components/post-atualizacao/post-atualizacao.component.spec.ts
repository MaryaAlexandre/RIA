import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAtualizacaoComponent } from './post-atualizacao.component';

describe('PostAtualizacaoComponent', () => {
  let component: PostAtualizacaoComponent;
  let fixture: ComponentFixture<PostAtualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAtualizacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAtualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
