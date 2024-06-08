import {computed, Injectable, signal, WritableSignal} from '@angular/core';
import {BaseEntity, FilterEvent, FilterItem} from "../../features/dashboard/model/filter.model";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private FILTER_PROPERTIES: string[] = [];
  private filteredIds: WritableSignal<number[]> = signal([]);
  private activeFilter: FilterItem[] = [];
  private entities: WritableSignal<BaseEntity[]> = signal([]);

  public getActiveFilter(): FilterItem[] {
    return JSON.parse(JSON.stringify(this.activeFilter));
  }

  public setFilterProperties(properties: string[]): void {
    this.FILTER_PROPERTIES = properties
  }

  // Map with initialized filter options to setup filter page
  public filterOptions: Map<string, string[]> = new Map<string, string[]>();
  public filteredEntities = computed(() => {
    const fe = this.entities().filter(e =>
      (this.filteredIds().length === 0 && this.activeFilter.length === 0)
      || this.filteredIds().includes(e.id));
    return fe;
  });

  public async setEntitiesForFilter(entities: BaseEntity[]): Promise<void> {
    this.entities.set(entities);
  }

  public async initData(entities: BaseEntity[]): Promise<void> {
    this.entities.set(entities);
    this.FILTER_PROPERTIES.forEach((prop) => {
      this.initOptions(prop);
    });
  }

  public setFilter(filterEvent: FilterEvent) {
    if (filterEvent.mode === 'add') {
      this.addFilterItem(filterEvent);
    } else {
      this.removeFilterItem(filterEvent);
    }
    this.filterItems();
  }

  private async initOptions(prop: string): Promise<void> {
    const options: string[] = await this.setupFilterOptionsForProperty(prop);
    this.filterOptions.set(prop, options);
  }

  protected addFilterItem(filterEvent: FilterEvent): void {
    const activeItem = this.activeFilter.find(filterItem => filterItem.name === filterEvent.name);
    if (!activeItem) {
      this.activeFilter.push({name: filterEvent.name, items: [filterEvent.item]});
    } else {
      const item = activeItem.items.find(i => i === filterEvent.item);
      if (!item) {
        activeItem.items.push(filterEvent.item);
      }
    }
  }

  protected removeFilterItem(filterEvent: FilterEvent): void {
    const activeItem = this.activeFilter.find(filterItem => filterItem.name === filterEvent.name);
    if (!activeItem) {
      return;
    } else {
      const item = activeItem.items.find(i => i === filterEvent.item);

      if (item) {
        const index = activeItem.items.indexOf(filterEvent.item);
        activeItem.items.splice(index, 1);
        this.maybeRemoveActiveFilterItem(activeItem);
      }
    }
  }

  protected maybeRemoveActiveFilterItem(activeItem: FilterItem): void {
     if (activeItem.items.length === 0) {
       const indexOfActiveItem = this.activeFilter.findIndex(i => i.name === activeItem.name);
       this.activeFilter.splice(indexOfActiveItem, 1);
     }
  }

  protected async setupFilterOptionsForProperty(prop: string): Promise<string[]> {
    const options: string[] = [];
    this.entities().forEach(filterEntity => {
      if (Object.prototype.hasOwnProperty.call(filterEntity, prop)) {
        const value: string = filterEntity[prop] as string;
        if (!options.includes(value)) {
          options.push(value);
        }
      }
    });
    return options;
  }

  protected filterItems(): void {
    this.filteredIds.set([]);
    this.entities().forEach(filterEntity => {
      this.maybeAddMeasurement(filterEntity)
    });
  }

  protected maybeAddMeasurement(filterEntity: BaseEntity) {
    let shouldAdd = true;

    this.activeFilter.forEach(filter => {
      const value: string = filterEntity[filter.name];
      if (!filter.items.includes(value)) {
        shouldAdd = false;
      }
    });

    if (shouldAdd) {
      this.filteredIds().push(filterEntity.id);
    }
  }
}
