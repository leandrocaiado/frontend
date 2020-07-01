import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MensagemPadrao } from 'app/_models/mensagem-padrao';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
declare var $:any;
import { ApiService } from 'app/_services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormularioHelper } from 'app/_helpers/formulario.helper';


@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{

  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: ApiService,
    private toastr: ToastrService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['']);
    }
  }
  valorMensagem :string;
  loginForm: FormGroup;
  // loading = false;
  submitted = false;
  returnUrl: string;
  // error = '';
  mostraErro = false;

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

  focus;
  focus1;
  focus2;
    test : Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;

   
    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit(){


       // remove user from local storage to log user out
       this.authenticationService.logout();



      this.mostraErro = true;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    
        this.checkFullPageBackgroundImage();
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
  
     

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
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
     // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          let sucesso = false;
        
          if (data.success) {

             sucesso = true;


          }
          
          
          if (sucesso) {
           
            this.router.navigate(['/dashboard']);
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
              
            this.authenticationService.logout();
            this.router.navigate(['']);
          }

        },
        error => {
          this.toastr.error('Erro desconhecido .', '', {
            timeOut: 3000,
            closeButton: true
          });

          this.authenticationService.logout();
          this.router.navigate(['/login']);
        }
      );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      FormularioHelper.getFocus('#username');
    }, 2);
  }
}

