import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from './person-model';
import { PersonService } from './person.service';
import { OrderByPipeline, OrderByComponent, OrderByHeadComponent, OrderBy } from '../shared';
import { Subject} from 'rxjs/Subject';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'persons',
    templateUrl: './app/person/person.component.html',
    styleUrls: ['./app/person/person.component.css'],
    pipes: [OrderByPipeline],
    directives: [OrderByComponent, OrderByHeadComponent]
})
export class PersonComponent {
    error: any;
    persons: Observable<Array<Person>>;
    selectedPerson: Person;
    orderByTarget: OrderBy;
    orderByFilter = '+';
    search$ = new Subject<string>();

    constructor(private _router: Router, private _personService: PersonService) { }

    ngOnInit() {
        this.orderByFilter = '+';

        this.persons = this.search$
            .startWith('')
            .debounceTime(1000)
            .map(value => value.trim())
            .distinctUntilChanged()
            .switchMap(value => this._personService.search(value));

    } 

    UpdateSort(orderBy: OrderBy) {
        let orderSign = orderBy.direction ? '+' : '-';
        this.orderByTarget = orderBy;
        this.orderByFilter = orderSign + orderBy.target;
    }

    onSelect(person: Person) {
        this.selectedPerson = person;
    }

    onCreate(){
        this._router.navigate(['/person/create']);
    }

    delete(person: Person, event: any) {
        event.stopPropagation();
        this._personService
            .delete(person)
            .then(res => {
                this.persons = this.persons.map(h => h.filter(x => x !== person));
                if (this.selectedPerson === person) { this.selectedPerson = null; }
            })
            .catch(error => this.error = error);
    }

    edit(person: Person, event: any) {
        event.stopPropagation();
        this._router.navigate(['/detail', person.id]);
    }
}
