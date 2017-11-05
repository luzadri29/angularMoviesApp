import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpModule, Http }    from '@angular/http';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.resetTestEnvironment();

    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
        HttpModule
      ]
    }).compileComponents();
  }));

  it('should do XHR', async(inject([Http], (http) => {
      http.get('/api/movies').subscribe(res => {
        expect(res.json()).toBe(1);
      });
    })));
});
