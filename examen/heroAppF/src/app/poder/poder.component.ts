import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response, Http} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";

@Component({
  selector: 'app-poder',
  templateUrl: './poder.component.html',
  styleUrls: ['./poder.component.css']
})
export class PoderComponent implements OnInit {

  title: string = "Ingresa los poderes de tus héroes favoritos";
  private _parametros:any;
  poderes = [];
  nuevoPoder = {};

  disabledButtons = {
    NuevoPoderFormSubmitButton: false
  };

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http:Http,
              private _masterURL:MasterUrlService) { }

  ngOnInit() {
    this._ActivatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url+'/poder?idHeroe='+this._parametros.idHeroe)
          .subscribe(
            (res:Response)=>{
              this.poderes = res.json()
                .map((value) => {
                  value.formularioCerrado = true;
                  return value;
                });
            },
            (err)=>{
              console.log(err)
            }
          )
      });
  }

  crearPoder(formulario){
    this.disabledButtons.NuevoPoderFormSubmitButton = true;
    console.log(formulario);

    let poder = {
      nombrePoder: formulario.value.nombrePoder,
      danioPoder: formulario.value.danioPoder,
      nivelPoder: formulario.value.nivelPoder,
      idHeroe:this._parametros.idHeroe
    };

    this._http.post(this._masterURL.url+"/poder", poder)
      .subscribe(
        (res:Response)=>{
          this.poderes.push(res.json());
          this.nuevoPoder = {};
          this.disabledButtons.NuevoPoderFormSubmitButton = false;
        },
        (err)=>{
          this.disabledButtons.NuevoPoderFormSubmitButton = false;
          console.log("Ocurrio un error", err);
        }
      )
  }

  borrarPoder(id: number) {
    this._http.delete(this._masterURL.url + "/poder/" + id)
      .subscribe(
        (res) => {
          let poderBorrado = res.json();
          this.poderes = this.poderes.filter(value => poderBorrado.id != value.id);
        },
        (err) => {
          console.log("Ocurrio un error", err);
        }
      )
  }

  editarPoder(poder: any, id:number) {
    let parametos = {
      nombrePoder: poder.nombrePoder,
      danioPoder: poder.danioPoder,
      nivelPoder: poder.nivelHeroe
    };
    this._http.put(this._masterURL.url + "/poder/" + poder.id, parametos)
      .subscribe(
        (res: Response) => {
          poder.formularioCerrado = !poder.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
