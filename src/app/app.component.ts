import { Component, OnInit } from '@angular/core';
import { FestivalService } from './festival-service/festival.service';
import { MusicFestival, Band, RecordLabel, BandInFestivals } from './festival-service/festival-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'ea-demo';
  private baseAddress: string = '';
  private errorMsg: any;
  public recordLabels: RecordLabel[] = [];

  constructor(private festivalService: FestivalService) { }

  ngOnInit(): void {
    this.festivalService.getJSON().subscribe(data => {
      this.baseAddress = data['apiBaseAddress'];
      this.getFestivals();
    });
  }

  getFestivals() {
    try {
      this.festivalService.getFestivals(this.baseAddress).subscribe((res: MusicFestival[]) => {
        if (res) {
          res.forEach(item => this.mapRecordLabels(item.name && item.name != '' ? item.name : 'N/A', item.bands));
          this.recordLabels.sort((a, b) => a.name.localeCompare(b.name));
          this.recordLabels.forEach(item => item.bands.sort((a, b) => a.name.localeCompare(b.name)));
        }
      }, err => {
        this.errorMsg = <any>err;
        console.log(this.errorMsg);
      });
    } catch (error) {
      console.log("error in method -- getFestivals");
    }
  }

  private mapRecordLabels(festival: string, bands: Band[]) {
    bands.forEach(item => {
      item.recordLabel = !item.recordLabel || item.recordLabel == '' ? 'N/A' : item.recordLabel;
      const recIndex = this.recordLabels.findIndex(el => el.name == item.recordLabel);
      if (recIndex < 0) {
        const recordLabel = {
          name: item.recordLabel,
          bands: [{
            name: item.name,
            festivals: [festival]
          }],
        }
        this.recordLabels.push(recordLabel);
      }
      else {
        const bandIndex = this.recordLabels[recIndex].bands.findIndex(el => el.name == item.name);
        if(bandIndex < 0){
          this.recordLabels[recIndex].bands.push({
            name: item.name,
            festivals: [festival]
          })
        }
        else{
          const festIndex = this.recordLabels[recIndex].bands[bandIndex].festivals.findIndex(el => el == item.name);
          if(festIndex < 0){
            this.recordLabels[recIndex].bands[bandIndex].festivals.push(festival);
          }          
        }
      }
    });
  }
}

