import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PlanetsApiService } from './planets-api.service';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import {FormControl} from '@angular/forms';

import {
  MatDialog
} from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { DialogPlanet } from './planet.dialog';
import { PeopleApiService } from './people-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'project-demo-angular';

  planetsAll: Observable<any[]> = this.planetsApi.getPlanets(
    environment.planetsApiUrl
  );
  planetsFormControl = new FormControl();

  //(колонки: назва, діаметер, клімат, кількість населення).
  displayedColsDefs: string[] = ['name', 'diameter', 'climate', 'population'];

  displayedHeaderRowDefs: string[] = ['key', 'value'];

  displayedHeaders: string[] = ['Charecteristic:', 'Value:'];

  selectedPlanet: { index: number } = { index: -1 };

  constructor(
    private planetsApi: PlanetsApiService,
    private peopleApi: PeopleApiService,
    public dialog: MatDialog
  ) {}

  async onRowClicked(planet: any) {
    console.log(planet);

    // let arrayOfPeople = [];

    const tmp = this.planetsAll.pipe( 
    map( allPlanets => allPlanets.filter( (pl: any, ind: number) => ind ===  this.selectedPlanet.index)),

    map( d =>  d.length > 0 ? d[0].residents : [] ) );

    const tmp2 = tmp.pipe(map(selPlanetResidents => {
      const arrayOfPeopleLinks = [...selPlanetResidents];

      const arrayOfObservablePeople: Observable<any>[] = arrayOfPeopleLinks.map( d=> {
         return this.peopleApi.getByUrl(d);
      })

      // for(const peop in await forkJoin(arrayOfObservablePeople).toPromise()) 
      
        return arrayOfObservablePeople;

    })).subscribe( async loaded => {
      
        const dialogRef = this.dialog.open(DialogPlanet, {
          width: '250px',
          data: {
            array: loaded.length > 0 ? await forkJoin(loaded).toPromise() : [],
            name: planet.name
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.feedBack = result;
        });

    });
         
    await tmp.toPromise();
  }

  filteredProperties(array: any[]) {
    return array !== null
      ? array
          .filter(el => this.displayedColsDefs.indexOf(el.key) > -1)
          .sort((a, b) =>
            this.displayedColsDefs.indexOf(a.key) <
            this.displayedColsDefs.indexOf(b.key)
              ? -1
              : 1
          )
      : [];
  }

  ngOnInit() {

    this.selectedPlanet = {
      index: -1
    };
  }
}
