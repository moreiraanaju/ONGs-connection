from django.shortcuts import render
from django.http import HttpResponse

def cadastrar_instituicao(request):
    return HttpResponse('Cadastrar Instituição')

def ver_pagina_principal(request):
    contexto = {'nome' : 'Nome Usuario'}
    return render(request, 'instituicoes/pagina_principal.html', contexto)