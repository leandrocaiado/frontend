import { Component } from '@angular/compiler/src/core';

export class EtapaModel {
    codigo: string;
    titulo: string;
    ordem: number;
    campos: CamposDinamicosModel[];
}

export class CamposDinamicosModel {
    codigo: string;
    editavel: boolean;
    visivel: boolean;
    obrigatorio: boolean
}
