import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from '../interfaces/ticket.interfaces';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  public tickets: Ticket[] = [];
  public page: number =0;
  public buscar: string = '';
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public FormText : string = '';

  public Ticket = {
    id : 0,
    titulo: '',
    descripcion: '',
    estatus: ''
  }
 
  constructor(
    private ticket:TicketService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.ListarTickets();

  }

  ListarTickets(){
    this.ticket.getTicket()
    .subscribe(tickets=>{
        this.tickets = tickets;
      }
    );

  }

  nextPage(){
    this.page += 5;
  }

  prevPage(){
    if(this.page > 0)
    this.page -= 5;
  }

  buscarTicket(buscar:string){
    this.page = 0;
    this.buscar = buscar;
    
  }

  crearTicket(){
    this.ticket.crearTicket(this.Ticket)
    .subscribe( (ticket) =>{
   
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `El ticket se creo exitosamente`,
        showConfirmButton: false,
        timer: 1500
      })
      this.ListarTickets();


    });
 

  }

  eliminarTicket(ticket:Ticket){

    Swal.fire({
      title: 'Esta seguro?',
      text:  `Eliminara el Ticket N° ${ticket.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed) {
        Swal.fire(
          `Ticket N° ${ticket.id} Eliminado`,
          '',
          'success'
        )
        this.ticket.eliminaTicket(ticket.id)
        .subscribe(ticket=>{
          this.ListarTickets();
        })
      }
    })

   

  }

  RegTicket(){
    this.ocultarEditar = false;
    this.ocultarRegistro = true;

    this.FormText = 'Registrar Ticket';

    this.Ticket.titulo = '';
    this.Ticket.descripcion = '';
  }

  editarTicket(ticket:Ticket){

    this.ocultarEditar = true;
    this.ocultarRegistro = false;

    this.FormText = 'Editar Ticket';

    this.Ticket.id = ticket.id;
    this.Ticket.titulo = ticket.titulo;
    this.Ticket.descripcion = ticket.descripcion;

  }

  actualizaTicket(){
    console.log(this.Ticket)

    this.ticket.editaTicket(this.Ticket.id,this.Ticket)
    .subscribe((ticket) =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Ticket Editado`,
        showConfirmButton: false,
        timer: 1500
      })
      this.ListarTickets();
    });

    this.ListarTickets();
  }

}
