import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'setup.settings')
django.setup()

from instituicoes.models import Instituicao, Projeto, Doador, Doacao

ong = Instituicao.objects.create(
    nome="ONG Esperança",
    cnpj="12345678000199",
    email="contato@esperanca.org",
    status="Ativo"
)

projeto = Projeto.objects.create(
    nome="Reforço Escolar",
    instituicao=ong,
    descricao="Aulas de reforço escolar para jovens da comunidade.",
    meta_financeira=5000
)

doador = Doador.objects.create(
    nome="Carlos Oliveira",
    email="carlos@email.com",
    tipo="Pessoa Física",
    cpf_cnpj="12345678900"
)

Doacao.objects.create(
    doador=doador,
    projeto=projeto,
    valor=300,
    tipo="Financeira",
    metodo_pagamento="Cartão"
)