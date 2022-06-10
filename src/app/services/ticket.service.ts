import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FetchAllResponse, Ticket } from '../components/interfaces/ticket.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private URL = 'http://localhost:8080';
  private Ticket: object = {};

  constructor(
    private http:HttpClient
  ) { }

  getTicket(): Observable<Ticket[]>{
    return this.http.get<FetchAllResponse>(`${this.URL}/api/tickets/`)
    .pipe(
      map( this.transform )
    );
  }

  private transform( resp: FetchAllResponse ) {


    const TicketList: Ticket[] = resp.tickets.map( ticket => {

     
      const email =  (ticket.Usuario)? ticket.Usuario.email: '';

     return{
      id: ticket.id,
      titulo: ticket.titulo,
      descripcion: ticket.descripcion,
      estatus: ticket.estatus,
      Usuario: ticket.Usuario,
      correo: email
     }
    })

   
    return TicketList;
  }

  eliminaTicket(id:number){
     return this.http.delete(`${this.URL}/api/tickets/${id}`);
  }

  crearTicket(Ticket:object){
    return this.http.post(`${this.URL}/api/tickets/`,Ticket);
  }

  editaTicket(id:number,Ticket:object){
    return this.http.put(`${this.URL}/api/tickets/${id}`,Ticket);
 }


}
