export interface Processo {
  id: string;
  nome: string;
  setor: string;
  cargo: string;
  processo: string;
  descricao: string;
  passos: string[];
  sigiloso: boolean;
}
