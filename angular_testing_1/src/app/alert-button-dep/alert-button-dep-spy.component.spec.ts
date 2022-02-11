import { AlertButtonDepService } from './alert-button-dep.service';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AlertButtonDepComponent } from './alert-button-dep.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlertButtonComponentWithSpy', () => {
  let fixture: ComponentFixture<AlertButtonDepComponent>; // test enviroment
  let component: AlertButtonDepComponent; // component
  let de: DebugElement; // html

  let service: AlertButtonDepService;
  let spy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AlertButtonDepComponent],
      imports: [HttpClientTestingModule],
      providers: [AlertButtonDepService]
    })
    .compileComponents(); // compiles template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonDepComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(AlertButtonDepService);
    spy = spyOn(service, 'getContent').and.returnValue(of('You have been warned'));
    fixture.detectChanges();
  });

  it('should call getContent one time and update the view', () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    expect(de.query(By.css('.message-body')).nativeElement.innerText).toContain('warn');
  });
});
