import { Component,  OnInit, } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  standalone: false,
  
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit  {
  datas : any;
  isVisible = true;
  Text = '';
  X = 0;
  Y = 0;
  panelOpen = false;  
  selectedRegion = '';
  selectedCity = ''; 


  constructor(private http:HttpClient,private base: BaseService) {} 

  ngOnInit(){
    this.getDatas()
  }
  getDatas(){
    this.base.getDatas().subscribe((res)=>{
      if(res){

        this.datas=res
      };   
  })
  }
  showText(event: MouseEvent, text: string) {
    this.Text = text;
    this.isVisible = true;
    this.moveText(event);
  }
  moveText(event: MouseEvent) {

    this.X = event.clientX +15;  
    this.Y = event.clientY +10;  
  }
  hideText() {

    this.isVisible = false;
  }

  selectRegion(region: string) {

    this.selectedRegion = region;
    this.panelOpen = false;
    setTimeout(() => {
      this.panelOpen = true;
    }, 10);
  }
  selectCity(city:string){
    this.selectedCity = city;
    this.panelOpen = false;
    setTimeout(() => {
      this.panelOpen = true
    }, 10);
  }

  closePanel() {
    this.panelOpen = false;
  }
  // addCirclesToSvg() {
  //   const svgElement = document.getElementById('map');
  //   if (!svgElement || !this.datas) return;
  //   const minLong = 16; 
  //   const maxLong = 22; 
  //   const minLat = 45; 
  //   const maxLat = 49; 
  //   const svgWidth = 900; 
  //   const svgHeight = 850; 
  //   const offsetX = 0;    
  //   const offsetY = -30;     
  //   this.datas.forEach((helyseg: any) => {
  //     const helysegNev = helyseg['Helységnév'];
  //     const hossz = parseFloat(helyseg['KH'].replace(',', '.'));
  //     const szel = parseFloat(helyseg['ÉSZ'].toString().replace(',', '.')); 
  //     const cx = offsetX + ((hossz - minLong) / (maxLong - minLong)) * svgWidth;
  //     const cy = offsetY + svgHeight - ((szel - minLat) / (maxLat - minLat)) * svgHeight;
  //     const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  //     circle.setAttribute('cx', cx.toString());
  //     circle.setAttribute('cy', cy.toString());
  //     circle.setAttribute('r', '3');
  //     circle.setAttribute('fill', 'black');
  //     circle.setAttribute('stroke', 'black');
  //     circle.setAttribute('stroke-width', '1');
  //     circle.setAttribute('id', helysegNev);
  //     svgElement.appendChild(circle);
  //   });
  // }
}