import { Component, ViewChild, ElementRef } from '@angular/core';
import { HOUSELIST } from 'src/app/db/list.house';
import { House } from '../models/house';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('validationButton') validationButtonRef!: ElementRef;

  allHouses = HOUSELIST;
  Housechosen: House = new House();

  searchFilter(value: string) {
    this.allHouses = HOUSELIST;
    this.allHouses = this.allHouses.filter((House) => {
      return House.place.toLowerCase().includes(value.toLowerCase());
      // Recupere les pokemons dont le nom contient la valeur de l'input en minuscule
    });
  }

  viewHouse(arg: House) {
    this.Housechosen = arg;
    console.log(this.Housechosen);
  }

  deleteHouse() {
    if (this.Housechosen.id !== undefined) {
      const index = this.allHouses.findIndex(
        (House) => House.id === this.Housechosen.id
      );

      if (index !== -1) {
        this.allHouses.splice(index, 1);

        this.Housechosen = new House();
      }
    }
  }
  onImageClick() {
    // Vérifiez si la classe 'house-indisponible' est présente
    const isIndisponible = document.querySelector('.house-indisponible');
    if (isIndisponible) {
      return;
    }
  }

  isMouseOverHouse: any = null;

  // ...

  onMouseEnter(house: any) {
    this.isMouseOverHouse = house;
  }

  onMouseLeave() {
    this.isMouseOverHouse = null;
  }
}
