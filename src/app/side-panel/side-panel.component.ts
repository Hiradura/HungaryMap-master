import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  standalone: false,
  
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
  @Input() isOpen = false;  
  @Input() selectedRegion = ''; 
  @Output() close = new EventEmitter<void>(); 

  closePanel() {
    this.close.emit(); 
  }
}
