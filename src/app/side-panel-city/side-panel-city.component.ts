import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-panel-city',
  standalone: false,
  
  templateUrl: './side-panel-city.component.html',
  styleUrl: './side-panel-city.component.css'
})
export class SidePanelCityComponent {
  @Input() isOpen = false;  
  @Input() selectedCity = ''; 
  @Output() close = new EventEmitter<void>(); 

  closePanel() {
    this.close.emit(); 
  }
}
