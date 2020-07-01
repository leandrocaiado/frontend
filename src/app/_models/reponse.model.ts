import { MensagemPadrao } from "./mensagem-padrao";


export class ResponseModel<T = any> {
  conteudoDoResponse: T;
  mensagens: MensagemPadrao[]
  campoDeFoco: any[]
}
