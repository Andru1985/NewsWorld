import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { FavoritosComponent } from './pages/favoritos/favoritos';
import { ContactoComponent } from './pages/contacto/contacto';
import { DetalleComponent } from './pages/detalle/detalle';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
  path: 'noticia/:id',
  component: DetalleComponent
},

  {
    path: 'favoritos',
    component: FavoritosComponent
  },

  {
    path: 'contacto',
    component: ContactoComponent
  },

  {
    path: '**',
    redirectTo: ''
  }

];