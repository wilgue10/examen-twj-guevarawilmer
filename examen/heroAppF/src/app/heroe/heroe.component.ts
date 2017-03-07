  import { Component, OnInit } from '@angular/core';
  import {Http, Response} from "@angular/http";
  import {MasterUrlService} from "../services/master-url.service";
  import {NgForm} from "@angular/forms";

  @Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styleUrls: ['./heroe.component.css']
  })
  export class HeroeComponent implements OnInit {

    title: string = "Aquí podrás ingresar tus héroes favoritos";
    nuevoHeroe = {};
    heroes = [];

    disabledButtons = {
      NuevoHeroeFormSubmitButton: false
    };

    constructor(private _http: Http,
                private _masterURL: MasterUrlService) { }

    ngOnInit() {
      this._http.get(this._masterURL.url + "/heroe")
        .subscribe(
          (res: Response) => {
            this.heroes = res.json()
              .map((value) => {
                value.formularioCerrado = true;
                return value;
              });
          },
          (err) => {
            console.log(err);
          }
        )
    }

    crearHeroe(formulario) {
      this.disabledButtons.NuevoHeroeFormSubmitButton = true;
      console.log(formulario);

      let heroe = {
        nombreHeroe: formulario.value.nombreHeroe,
        castilloHeroe: formulario.value.castilloHeroe,
        nivelHeroe: formulario.value.nivelHeroe,
        imagenHeroe: formulario.value.imagenHeroe
      };

      this._http.post(this._masterURL.url + "/heroe", heroe)
        .subscribe(
          (res) => {
            console.log("No hubo Errores");
            console.log(res);
            this.heroes.push(res.json());
            this.nuevoHeroe = {};
            this.disabledButtons.NuevoHeroeFormSubmitButton = false;
          },
          (err) => {
            this.disabledButtons.NuevoHeroeFormSubmitButton = false;
            console.log("Ocurrio un error", err);
          }
        );
    }

    borrarHeroe(id: number) {
      this._http.delete(this._masterURL.url + "/heroe/" + id)
        .subscribe(
          (res) => {
            let heroeBorrado = res.json();
            this.heroes = this.heroes.filter(value => heroeBorrado.id != value.id);
          },
          (err) => {
            console.log("Ocurrio un error", err);
          }
        )
    }

    editarHeroe(heroe: any) {
      let parametos = {
        nombreHeroe: heroe.nombreHeroe,
        castilloHeroe: heroe.castilloHeroe,
        nivelHeroe: heroe.nivelHeroe,
        imagenHeroe: heroe.imagenHeroe
      };
      this._http.put(this._masterURL.url + "/heroe/" + heroe.id, parametos)
        .subscribe(
          (res: Response) => {
            heroe.formularioCerrado = !heroe.formularioCerrado;
            console.log("Respuesta:", res.json());
          },
          (err) => {
            console.log("Error:", err);
          }
        )
    }

  }
