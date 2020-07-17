import { Component, OnInit } from '@angular/core';
import { Dish } from '../menu/shared/dish';
import { DISHES} from '../menu/shared/dishes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  dishes =  DISHES;

  selectedDish: Dish;



  constructor() { }

  ngOnInit() {
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}