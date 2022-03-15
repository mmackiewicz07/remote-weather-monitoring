import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/core/app-store';
import { measurementsActions } from './store/measurements-store/index';
import * as moment from 'moment';
import { Chart, registerables } from 'chart.js'

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  public photoresistorValue!: any;
  public humidityValue!: any;
  public pressureValue!: any;
  public smokeValue!: any;
  public temperatureValue!: any;

  public photoresistorValueDatesTable: any = [];
  public photoresistorValuesTable: any = [];

  public humidityValueDatesTable: any = [];
  public humidityValuesTable: any = [];

  public pressureValueDatesTable: any = [];
  public pressureValuesTable: any = [];

  public smokeValueDatesTable: any = [];
  public smokeValuesTable: any = [];

  public temperatureValueDatesTable: any = [];
  public temperatureValuesTable: any = [];

  public temperatureChart: any;
  public humidityChart: any;
  public pressureChart: any;
  public photoChart: any;
  public smokeChart: any;

  public currentDate = moment().format('DD.MM.YYYY');

  constructor(private store: Store<AppStoreState>, public db: AngularFireDatabase) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.store.dispatch(measurementsActions.getMeasurementsActions.send({}));
    const photoresistor: AngularFireList<any> = this.db.list('Photoresistor');
    const humidity: AngularFireList<any> = this.db.list('Humidity');
    const pressure: AngularFireList<any> = this.db.list('Pressure');
    const smoke: AngularFireList<any> = this.db.list('Smoke');
    const temperature: AngularFireList<any> = this.db.list('Temperature');
    const hotoresistor: AngularFireList<any> = this.db.list('hotoresistor');
    const umidity: AngularFireList<any> = this.db.list('umidity');
    const ressure: AngularFireList<any> = this.db.list('ressure');
    const moke: AngularFireList<any> = this.db.list('moke');
    const emperature: AngularFireList<any> = this.db.list('emperature');

    photoresistor.valueChanges().subscribe(x => {
      const time = moment(+x[0]).format('DD.MM.YYYY, HH:mm');
      const value = x[1];
      if (this.photoresistorValueDatesTable.length === 4) {
        this.photoresistorValueDatesTable.shift();
        this.photoresistorValuesTable.shift();
      }
      this.photoresistorValueDatesTable.push(time);
      this.photoresistorValuesTable.push(value);
      this.generatePhotoresistorChart();
      this.photoresistorValue = { time, value };
    });
    humidity.valueChanges().subscribe(x => {
      const time = moment(+x[0]).format('DD.MM.YYYY, HH:mm');
      const value = x[1];
      if (this.humidityValueDatesTable.length === 4) {
        this.humidityValueDatesTable.shift();
        this.humidityValuesTable.shift();
      }
      this.humidityValueDatesTable.push(time);
      this.humidityValuesTable.push(value);
      this.generateHumidityChart();
      this.humidityValue = { time, value };
    });
    pressure.valueChanges().subscribe(x => {
      const time = moment(+x[0]).format('DD.MM.YYYY, HH:mm');
      const value = x[1];
      if (this.pressureValueDatesTable.length === 4) {
        this.pressureValueDatesTable.shift();
        this.pressureValuesTable.shift();
      }
      this.pressureValueDatesTable.push(time);
      this.pressureValuesTable.push(value);
      this.generatePressureChart();
      this.pressureValue = { time, value };
    });
    smoke.valueChanges().subscribe(x => {
      const time = moment(+x[0]).format('DD.MM.YYYY, HH:mm');
      const value = x[1];
      if (this.smokeValueDatesTable.length === 4) {
        this.smokeValueDatesTable.shift();
        this.smokeValuesTable.shift();
      }
      this.smokeValueDatesTable.push(time);
      this.smokeValuesTable.push(value);
      this.generateSmokeChart();
      this.smokeValue = { time, value };
    });
    temperature.valueChanges().subscribe(x => {
      const time = moment(+x[0]).format('DD.MM.YYYY, HH:mm');
      const value = x[1];
      if (this.temperatureValueDatesTable.length === 4) {
        this.temperatureValueDatesTable.shift();
        this.temperatureValuesTable.shift();
      }
      this.temperatureValueDatesTable.push(time);
      this.temperatureValuesTable.push(value);
      this.generateTemperatureChart();
      this.temperatureValue = { time, value };
    });
    hotoresistor.valueChanges().subscribe(x => {
      const time = moment(+x[0]).format('DD.MM.YYYY, HH:mm');
      const value = x[1];
      if (this.photoresistorValueDatesTable.length === 4) {
        this.photoresistorValueDatesTable.shift();
        this.photoresistorValuesTable.shift();
      }
      this.photoresistorValueDatesTable.push(time);
      this.photoresistorValuesTable.push(value);
      this.generatePhotoresistorChart();
      this.photoresistorValue = { time, value };
    });
    // umidity.valueChanges().subscribe(x => {
    //   const time = moment(+x[0]).format('DD.MM.YYYY, HH:mm');
    //   const value = x[1];
    //   if (this.humidityValueDatesTable.length === 4) {
    //     this.humidityValueDatesTable.shift();
    //     this.humidityValuesTable.shift();
    //   }
    //   this.humidityValueDatesTable.push(time);
    //   this.humidityValuesTable.push(value);
    //   this.generateHumidityChart();
    //   this.humidityValue = { time, value };
    // });
    ressure.valueChanges().subscribe(x => {
      const time = moment(+x[0]).format('DD.MM.YYYY, HH:mm');
      const value = x[1];
      if (this.pressureValueDatesTable.length === 4) {
        this.pressureValueDatesTable.shift();
        this.pressureValuesTable.shift();
      }
      this.pressureValueDatesTable.push(time);
      this.pressureValuesTable.push(value);
      this.generatePressureChart();
      this.pressureValue = { time, value };
    });
    moke.valueChanges().subscribe(x => {
      const time = moment(+x[0]).format('DD.MM.YYYY, HH:mm');
      const value = x[1];
      if (this.smokeValueDatesTable.length === 4) {
        this.smokeValueDatesTable.shift();
        this.smokeValuesTable.shift();
      }
      this.smokeValueDatesTable.push(time);
      this.smokeValuesTable.push(value);
      this.generateSmokeChart();
      this.smokeValue = { time, value };
    });
    emperature.valueChanges().subscribe(x => {
      const time = moment(+x[0]).format('DD.MM.YYYY, HH:mm');
      const value = x[1];
      if (this.temperatureValueDatesTable.length === 4) {
        this.temperatureValueDatesTable.shift();
        this.temperatureValuesTable.shift();
      }
      this.temperatureValueDatesTable.push(time);
      this.temperatureValuesTable.push(value);
      this.generateTemperatureChart();
      this.temperatureValue = { time, value };
    });
  }


  public calculateSmoke(): string {
    return Number(this.smokeValue) > 600 ? ' zbyt wysoki !' : ' w normie'

  }

  public generatePhotoresistorChart(): void {

    this.photoChart?.destroy();

    this.photoChart = new Chart('photoresistorChart', {
      type: 'line',
      data: {
        labels: this.photoresistorValueDatesTable,
        datasets: [{
          label: 'Natężenie światła',
          data: this.photoresistorValuesTable,
          borderColor: '#3cba9f',
          fill: false
        }]
      },
      options: {
        scales: {
          yAxes: {
            display: true
          },
          xAxes: {
            display: true
          }
        }
      },
    })
  }

  public generateHumidityChart(): void {

    this.humidityChart?.destroy();

    this.humidityChart = new Chart('humidityChart', {
      type: 'line',
      data: {
        labels: this.humidityValueDatesTable,
        datasets: [{
          label: 'Wilgotność',
          data: this.humidityValuesTable,
          borderColor: '#74e492',
          fill: false
        }]
      },
      options: {
        scales: {
          yAxes: {
            display: true
          },
          xAxes: {
            display: true
          }
        }
      },
    })
  }

  public generatePressureChart(): void {

    this.pressureChart?.destroy();

    this.pressureChart = new Chart('pressureChart', {
      type: 'line',
      data: {
        labels: this.pressureValueDatesTable,
        datasets: [{
          label: 'Wilgotność',
          data: this.pressureValuesTable,
          borderColor: '#21a242',
          fill: false
        }]
      },
      options: {
        scales: {
          yAxes: {
            display: true
          },
          xAxes: {
            display: true
          }
        }
      },
    })
  }

  public generateSmokeChart(): void {

    this.smokeChart?.destroy();

    this.smokeChart = new Chart('smokeChart', {
      type: 'line',
      data: {
        labels: this.smokeValueDatesTable,
        datasets: [{
          label: 'Wilgotność',
          data: this.smokeValuesTable,
          borderColor: '#dff249',
          fill: false
        }]
      },
      options: {
        scales: {
          yAxes: {
            display: true
          },
          xAxes: {
            display: true
          }
        }
      },
    })
  }

  public generateTemperatureChart(): void {

    this.temperatureChart?.destroy();

    this.temperatureChart = new Chart('temperatureChart', {
      type: 'line',
      data: {
        labels: this.smokeValueDatesTable,
        datasets: [{
          label: 'Wilgotność',
          data: this.smokeValuesTable,
          borderColor: '#dff249',
          fill: false
        }]
      },
      options: {
        scales: {
          yAxes: {
            display: true
          },
          xAxes: {
            display: true
          }
        }
      },
    })
  }

  public generateMessage(): string {
    console.log('temperatureValue', this.humidityValue);
    if (Number(this.temperatureValue.value) > 22) {
      return 'Jeśli chodzi o warunki pracy, bez względu na płeć lepiej myśli i działa nam się w pomieszczeniach chłodniejszych. Holenderscy naukowcy z Maastricht University Medical Centre przekonują, że najbardziej odpowiednia temperatura w biurze wynosi około 22 stopni dla mężczyzn i 25 stopni dla kobiet.'
    } else if (Number(this.humidityValue.value) > 55) { return 'Optymalna wilgotność dla człowieka to 40-60% i jednocześnie taki jej poziom jest korzystny dla ubrań, książek, mebli oraz podłóg.' }
    else {
      return '';
    }

  }
}
