from django.contrib.auth.decorators import login_required
from instituicoes.utils import tipo_requerido
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from .forms import CadastroUsuarioForm
from django.shortcuts import render
from django.http import HttpResponse

def cadastrar_instituicao(request):
    return HttpResponse('Cadastrar Instituição')

def ver_pagina_principal(request):
    contexto = {'nome' : 'Nome Usuario'}
    return render(request, 'instituicoes/pagina_principal.html', contexto)

class CadastroUsuarioView (CreateView) :
    template_name = 'registration/cadastro.html'
    form_class = CadastroUsuarioForm
    success_url = reverse_lazy('login') # redireciona para login após cadastro

@login_required
@tipo_requerido('ONG')
def painel_ong(request):
    return render(request, 'instituicoes/painel_ong.html')

def ver_home(request):
    contexto = {'nome' : 'Nome Usuario'}
    return render(request, 'home.html', contexto)