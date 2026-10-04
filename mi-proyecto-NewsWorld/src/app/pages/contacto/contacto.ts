import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class ContactoComponent {

  nombre = '';
  correo = '';
  mensaje = '';

  enviarFormulario(): void {

    alert(
      'Mensaje enviado correctamente. Gracias por contactarnos, ' +
      this.nombre + '.'
    );

    this.nombre = '';
    this.correo = '';
    this.mensaje = '';
  }

}