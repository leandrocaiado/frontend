import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/_services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MensagemPadrao } from 'app/_models/mensagem-padrao';
import {  EventEmitter } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { first } from 'rxjs/operators';
declare var require: any
declare var $:any;

const URL = 'http://localhost:3000/fileupload/';

@Component({
  selector: 'app-cadastroLog',
  styleUrls: ['./cadastroLog.component.css'],
  templateUrl: './cadastroLog.component.html'
})

export class CadastroLogComponent{
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    
  }
  
  valorMensagem :string;
  cadastroLogForm: FormGroup;
  // loading = false;
  submitted = false;
  returnUrl: string;
  giro: string;

   file: File ;

  
 
  get f() {
    return this.cadastroLogForm.controls;
  }
  
  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment'



    });

  public onFileSelected(event: EventEmitter<File[]>) {

    this.file = event[0];
    console.log(this.file);

  }
  ngOnInit(){




 this.cadastroLogForm = this.formBuilder.group({
  arquivo: ['', Validators.required]
 });


   
 

  }
 
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.cadastroLogForm.invalid) {

      return;
    }


//chamada end point upload

this.apiService
 .postFile(this.file)
 .pipe(first())
 .subscribe(
   data => {
     let sucesso = false;
   
     if (data.success) {

        sucesso = true;


     }
     
     
     if (sucesso) {
      
     
         this.toastr.success(data.mensagem, '', {
           timeOut: 3000,
           closeButton: true
         });
       
       
     } else {

this.valorMensagem = data.mensagem ;

     
    
           this.toastr.error(   this.valorMensagem  , '', {
             timeOut: 3000,
             closeButton: true
           });
         
       this.apiService.logout();
       this.router.navigate(['']);
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
  
  
}
