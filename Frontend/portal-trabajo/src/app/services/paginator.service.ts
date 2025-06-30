import {Injectable} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material/paginator";

@Injectable()
export class PaginatorIntl extends MatPaginatorIntl {
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    return `Página ${page + 1} de ${Math.ceil(length/pageSize)}`
  }
}