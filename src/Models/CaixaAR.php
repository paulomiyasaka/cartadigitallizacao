<?php

namespace Carta\Models;

use Carta\Enums\Permissao;
use Carta\Enums\Situacao;

class CaixaAR
{

    public function __construct
    (
        public readonly int $numeroCaixa,
        public readonly string $siglaCliente,
        public readonly string $nomeCliente,
        public readonly int $codigoCliente,
        public readonly int $loteClienteInicial,
        public readonly int $loteClienteFinal,
        public readonly int $quantidadeLotes,
        public readonly int $quantidadeObjetos,
        public readonly Situacao $situacao,
        public readonly string $quebraSequencia,
        public readonly Permissao $conferido,
        public readonly Permissao $corrigido,
        public readonly Permissao $retida,
        public readonly Permissao $armazenar,
        public readonly int $prazoArmazenamento,
        public readonly Permissao $fragmentar
    ) {}

    public static function fromArray(array $dados): self 
    {
        
        return new self(
            numeroCaixa: $dados[0]->numero_caixa,
            siglaCliente: $dados[0]->sigla_cliente,
            nomeCliente: $dados[0]->nome_cliente,
            codigoCliente: $dados[0]->codigo_cliente,        
            quantidadeLotes: $dados[0]->quantidade_lotes,
            quantidadeObjetos: $dados[0]->quantidade_objetos,
            loteClienteInicial: $dados[0]->lote_cliente_inicial,
            loteClienteFinal: $dados[0]->lote_cliente_final,
            situacao: Situacao::from($dados[0]->situacao),
            quebraSequencia: $dados[0]->quebra_sequencia,
            conferido: Permissao::tryFrom($dados[0]->conferido ?? '') ?? Permissao::NAO,
            corrigido: Permissao::tryFrom($dados[0]->corrigido ?? '') ?? Permissao::NAO,
            retida: Permissao::tryFrom($dados[0]->retida ?? '') ?? Permissao::NAO,
            armazenar: Permissao::tryFrom($dados[0]->armazenar ?? '') ?? Permissao::SIM,
            prazoArmazenamento: $dados[0]->prazo_armazenamento,
            fragmentar: Permissao::tryFrom($dados[0]->fragmentar ?? '') ?? Permissao::NAO

        );
    }


}


?>