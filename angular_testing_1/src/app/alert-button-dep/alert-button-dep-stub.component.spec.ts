import { AlertButtonDepService } from './alert-button-dep.service';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { AlertButtonDepComponent } from './alert-button-dep.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlertButtonComponentWithStub', () => {
  let fixture: ComponentFixture<AlertButtonDepComponent>; // test enviroment
  let component: AlertButtonDepComponent; // component
  let de: DebugElement; // html

  let serviceStub: any;

  beforeEach(waitForAsync(() => {
    serviceStub = {
      getContent: () => of('You have been warned')
    };
    TestBed.configureTestingModule({
      declarations: [AlertButtonDepComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: AlertButtonDepService, useValue: serviceStub}]
    })
    .compileComponents(); // compiles template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonDepComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should have message content defined from an observable', () => {
    component.content.subscribe(content => {
      expect(content).toBeDefined();
      expect(content).toBe('You have been warned');
    });
  });
});
