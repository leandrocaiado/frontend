import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { ApiService } from 'app/_services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MensagemPadrao } from 'app/_models/mensagem-padrao';
import { first } from 'rxjs/operators';
declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'esqueceu-cmp',
    templateUrl: './esqueceuSenha.component.html'
})

export class EsqueceuSenhaComponent implements OnInit{
  focus;
  focus1;
  focus2;
  valorMensagem :string;
  mostraErro = false;
    test : Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    submitted = false;
    esqueceuForm: FormGroup;
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

    constructor(private element : ElementRef,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService,
        private toastr: ToastrService
      ) {
        // redirect to home if already logged in
        
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
      }
      get f() {
        return this.esqueceuForm.controls;
      }

      onSubmit() {
        this.submitted = true;
 
        // stop here if form is invalid
        if (this.esqueceuForm.invalid) {
      
          return;
        }
     // this.loading = true;
     this.apiService
     .esqueceu(this.f.email.value)
     .pipe(first())
     .subscribe(
       data => {
         let sucesso = false;
       
         if (data.success) {

            sucesso = true;


         }
         
         
         if (sucesso) {
          
           this.router.navigate(['']);
             this.toastr.success(data.mensagem, '', {
               timeOut: 3000,
               closeButton: true
             });
           
           
         } else {
  
           this.valorMensagem = data.mensagem[0] ;
         
        
               this.toastr.error(   this.valorMensagem  , '', {
                 timeOut: 3000,
                 closeButton: true
               });
             
 
         }

       },
       error => {
         this.toastr.error('Erro desconhecido .', '', {
           timeOut: 3000,
           closeButton: true
         });

      
       }
     );
 }
    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('esqueceu-page');
        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit(){
        this.mostraErro = true;
        this.esqueceuForm = this.formBuilder.group({
          email: ['', Validators.required]
        });
        this.checkFullPageBackgroundImage();

        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('esqueceu-page');
    }
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
}
