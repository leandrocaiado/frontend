export class User {
  static: any;
  constructor(form = undefined) {
    if (form) {
      this.token = form.token;
      this.phone = form.phone;
      this.name = form.name;
      this.phoneConfirmed = form.phoneConfirmed;
      this.email = form.email;
      this.status = form.status;
      this.message=       this.message = form.status;

      
      this.uriPhoto = form.uriPhoto;
     
  }
  }
 
  token: string;
  phone: string;
  name: string;

  phoneConfirmed: string;
  email: string;
  senha: string;
  status: string;
  message: string;
  uriPhoto: string;

}
