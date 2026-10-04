import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class ContactoComponent {

  nombre = '';
  correo = '';
  mensaje = '';

  enviarFormulario(): void {
    alert(
      '¡Mensaje enviado correctamente! Gracias por contactar con NewsWorld.'
    );

    this.nombre = '';
    this.correo = '';
    this.mensaje = '';
  }
}