from django.urls import path
from . import views
from .views import InstituicaoListCreateView


urlpatterns = [
    path('instituicoes/', InstituicaoListCreateView.as_view(), name='instituicao-list-create'),
    path('cadastrar_instituicao/', views.cadastrar_instituicao, name = 'cadastrar_instituicao'),
    path('ver_pagina_principal/', views.ver_pagina_principal, name = 'ver_pagina_principal'),
    path('home/', views.ver_home, name='home'),
    path('painel-ong/', views.painel_ong, name='painel_ong'),
]

