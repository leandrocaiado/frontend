import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/_services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MensagemPadrao } from 'app/_models/mensagem-padrao';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Log } from 'app/_models/log';
declare var $:any;
@Component({
  selector: 'app-pesquisaLog',
  templateUrl: './pesquisaLog.component.html'
})

export class PesquisaLogComponent{
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    
  }
  listaLog :Log[];
  valorMensagem :string;
  pesquisaLogForm: FormGroup;
  // loading = false;
  submitted = false;
  returnUrl: string;
  // error = '';
  mostraErro = false;
  focus;
  focus1;
  focus2;
  model: Date;
  model2: Date;
  mensagemPadrao: MensagemPadrao[] = [
    {
      tipoDeMensagem: 'alert alert-success mt-3 mb-0',
      mensagem: 'Mensagem 1',
      aberto: true
    },
    {
      tipoDeMensagem: 'alert alert-danger mt-3 mb-0',
      mensagem: 'Mensagem 2',
      aberto: true
    }
  ];
  get f() {
    return this.pesquisaLogForm.controls;
  }

  
  
  ngOnInit(){


    
 this.pesquisaLogForm = this.formBuilder.group({
   data: ['', Validators.required],
   ip: ['', ],
   hora: ['', ]

 });
 this.model = new Date();
 this.model2 = new Date();
   //  Activate the tooltips
   $('[rel="tooltip"]').tooltip();

   var tagClass = $('.tagsinput').data('color');

   if ($(".tagsinput").length != 0) {
     $('.tagsinput').tagsinput();
   }

   $('.bootstrap-tagsinput').addClass('' + tagClass + '-badge');

   //  Init Bootstrap Select Picker
   if ($(".selectpicker").length != 0) {
     $(".selectpicker").selectpicker({
       iconBase: "nc-icon",
       tickIcon: "nc-check-2"
     });
   }

   if ($(".datetimepicker").length != 0) {
     $('.datetimepicker').datetimepicker({
       icons: {
         time: "fa fa-clock-o",
         date: "fa fa-calendar",
         up: "fa fa-chevron-up",
         down: "fa fa-chevron-down",
         previous: 'fa fa-chevron-left',
         next: 'fa fa-chevron-right',
         today: 'fa fa-screenshot',
         clear: 'fa fa-trash',
         close: 'fa fa-remove'
       },
       debug: true
     });
   }

   if ($(".datepicker").length != 0) {
     $('.datepicker').datetimepicker({
       format: 'MM/DD/YYYY',
       icons: {
         time: "fa fa-clock-o",
         date: "fa fa-calendar",
         up: "fa fa-chevron-up",
         down: "fa fa-chevron-down",
         previous: 'fa fa-chevron-left',
         next: 'fa fa-chevron-right',
         today: 'fa fa-screenshot',
         clear: 'fa fa-trash',
         close: 'fa fa-remove'
       },
       debug: true
     });
   }

  }

  
  onSubmit() {
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.pesquisaLogForm.invalid) {
    
      return;
    }

//chamada end point pesquisa

this.apiService
 .pesquisar(this.f.data.value,this.f.hora.value,this.f.ip.value)
 .pipe(first())
 .subscribe(
   data => {
     let sucesso = false;

     

  
   this.listaLog = data.lista ? data.conteudoDoResponse.lista : data.lista;

   
   },
   error => {
     this.toastr.error('Erro desconhecido .', '', {
       timeOut: 3000,
       closeButton: true
     });

   
   }
 );
 

  }
}
