from django.urls import path
from . import views

urlpatterns = [
    path('cadastrar_instituicao/', views.cadastrar_instituicao, name = 'cadastrar_instituicao'),
    path('ver_pagina_principal/', views.ver_pagina_principal, name = 'ver_pagina_principal'),
]

