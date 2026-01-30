<?php

namespace Carta\Models;

class OrigemAR
{

    public function __construct
    (
        public readonly int $mcuOrigem,
        public readonly int $matricula,
        public readonly string $siglaSe,
        public readonly string $unidadeRemetente,
        public readonly int $cnpj,
        public readonly string $logradouro,
        public readonly string $numero,
        public readonly string $complemento,
        public readonly string $bairro,
        public readonly string $cidade,
        public readonly string $uf,
        public readonly int $cep
    ) {}

    public static function fromArray(array $dados): self 
    {
        
        return new self(
            mcuOrigem: $dados[0]->mcu_origem,
            matricula: $dados[0]->matricula,
            siglaSe: $dados[0]->sigla_se,
            unidadeRemetente: $dados[0]->unidade_remetente,        
            cnpj: $dados[0]->cnpj,
            logradouro: $dados[0]->logradouro,
            numero: $dados[0]->numero,
            complemento: $dados[0]->complemento,
            bairro: $dados[0]->bairro,
            cidade: $dados[0]->cidade,
            uf: $dados[0]->uf,
            cep: $dados[0]->cep

        );
    }


}


?>