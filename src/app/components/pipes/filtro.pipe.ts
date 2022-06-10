import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../interfaces/ticket.interfaces';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(tickets: Ticket[],page: number=0,buscar:string = ''): Ticket[] {

    if(buscar.length === 0)
    return tickets.slice(page,page +5);

    const TicketFiltrados = tickets.filter( ticket => ticket.estatus.includes(buscar));

    return TicketFiltrados.slice(page,page +5);

  }

}
