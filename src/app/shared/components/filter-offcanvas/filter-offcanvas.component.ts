import {Component, inject} from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {FilterService} from "../../services/filter-service.service";
import {UpperCasePipe} from "@angular/common";
import {PrettyNamePipe} from "../../pipes/pretty-name.pipe";
import {IconComponent} from "../icon/icon/icon.component";
import {mdiFilter} from "@mdi/js";

@Component({
  selector: 'app-filter-offcanvas',
  standalone: true,
  imports: [
    UpperCasePipe,
    PrettyNamePipe,
    IconComponent
  ],
  templateUrl: './filter-offcanvas.component.html',
  styleUrl: './filter-offcanvas.component.scss'
})
export class FilterOffcanvasComponent  {

  protected readonly activeOffcanvas = inject(NgbActiveOffcanvas);
  private readonly filterService = inject(FilterService);

  public filterOptions = this.filterService.filterOptions
  public activeFilters = this.filterService.getActiveFilter();

  protected readonly onchange = onchange;

  setFilter(event$: any, option: string, value: string) {
    const input = event$.target as HTMLInputElement;
    const mode = input.checked? "add" : "remove";
    this.filterService.setFilter({name: option, item: value, mode: mode});
  }

  isChecked(option: string, value: string): boolean {
    return !!this.activeFilters.find(a => a.name === option)?.items.includes(value);
  }

  protected readonly mdiFilter = mdiFilter;
}
