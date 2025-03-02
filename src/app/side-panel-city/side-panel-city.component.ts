import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-panel-city',
  templateUrl: './side-panel-city.component.html',
  styleUrls: ['./side-panel-city.component.css'],
  standalone:false
})
export class SidePanelCityComponent {
  @Input() city: string = '';
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closePanel() {
    this.close.emit();
  }
}
