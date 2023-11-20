import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HOUSELIST } from '../db/list.house';
import { House } from '../models/house';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  @ViewChild('validationButton') validationButtonRef!: ElementRef;

  AllHouses = HOUSELIST;
  Housechosen: House | any = new House();
  bsModalRef!: BsModalRef;
  isValidationDisabled: boolean = false;
  arrivalDate: string = '';
  departureDate: string = '';
  maxDepartureDate: string = '';
  numberOfPersons: number = 1 ;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
  ) {}

  updateMaxDepartureDate() {
    this.maxDepartureDate = this.arrivalDate;
  }

  ngOnInit(): void {
    let idUrl: number | any = this.activeRoute.snapshot.paramMap.get('id');

    for (let i = 0; i < this.AllHouses.length; i++) {
      if (this.AllHouses[i].id == idUrl) {
        this.Housechosen = this.AllHouses[i];
        console.log(this.Housechosen);
        break;
      }
    }
  }
  toggleHouseIndisponible() {
    this.Housechosen.disponible = !this.Housechosen.disponible;
  }

  validerReservation() {
    if (!this.isValidationDisabled) {
      this.isValidationDisabled = true;

      const index = this.AllHouses.findIndex(
        (house) => house.id === this.Housechosen.id
      );

      if (index !== -1) {
        const houseElement = document.getElementById(
          `house-${this.Housechosen.id}`
        );
        if (houseElement) {
          houseElement.classList.add('house-indisponible');
        }

        this.AllHouses[index].disponible = false;
      }
    }

    alert(
      "Votre réservation a bien été effectuée. cliquez sur OK pour retourner a l'acceuil."
    );
    this.router.navigate(['/']);
  }
  updatePrice() {
    // Utilisez Housechosen.price et numberOfPersons pour calculer le nouveau prix
  }
}
