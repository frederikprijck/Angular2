import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { HttpModule, XHRBackend }             from '@angular/http';
import { InMemoryBackendService, SEED_DATA }  from 'angular2-in-memory-web-api';
import { InMemoryDataService }                from './api/in-memory-data.service';

import { DashboardComponent }       from './dashboard/dashboard.component';
import { Team4TalentComponent }     from './team4talent/team4talent.component';
import { AppComponent }             from './app.component';
import { Routing }                  from './app.routing';

// import { PersonService }            from './person/person.service';
// import { PersonSearchService }      from './person/Person-search.service';
// import { PersonComponent }          from './person/person.component';
// import { PersonDetailComponent }    from './person/person-detail.component';
import * as person                  from './person';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    HttpModule
  ],
   providers: [
    person.PersonService,
    person.PersonSearchService,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA,  useClass: InMemoryDataService }     // in-mem server data
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    Team4TalentComponent,
    person.PersonComponent,
    person.PersonDetailComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
