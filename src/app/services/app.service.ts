import { Injectable } from '@angular/core';

import { UnitItem } from '../interfaces/unit-item';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private dataLocation = '/assets/data/age-of-empires-units.json';
  public allUnits: UnitItem[] = [];
  public isAtHome: boolean = true;

  public async getAllUnits(): Promise<UnitItem[]> {
    const data = await fetch(this.dataLocation);
    return (await data.json()).units ?? [];
  }

  async getUnitById(id: number): Promise<UnitItem | undefined> {
    if(this.allUnits.length < 1) {
      this.allUnits = await this.getAllUnits();
    }
    return this.allUnits.find(u => u.id === id);
  }
}
