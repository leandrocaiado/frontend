import { FormGroup } from '@angular/forms';
import { Renderer2 } from '@angular/core';

export class FormularioHelper {

    static ValidarFormulario(formulario: FormGroup): boolean {
        Object.keys(formulario.controls).forEach(campo => {
            const controle = formulario.get(campo);
            controle.markAsTouched();
        });

        return formulario.valid;
    }

    static getFocus(selector: string, nextFocus: Function = undefined) {
        let element: HTMLInputElement = document.querySelector(selector);

        if (element.disabled) {
            nextFocus();
        } else {
            element.focus();
        }
    }
}
