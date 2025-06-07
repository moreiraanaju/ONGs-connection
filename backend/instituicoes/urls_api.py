from django.urls import path
from .views_api import (
    InstituicaoListCreateView, 
    DoadorListCreateView,
    ProjetoListCreateView,
    DoacaoListCreateView, 
    NecessidadeListCreateView,
    VoluntariadoListCreateView
)

from .views_api import (
    InstituicaoDetailView, DoadorDetailView,
    ProjetoDetailView, DoacaoDetailView,
    NecessidadeDetailView, VoluntariadoDetailView
)


urlpatterns = [
    path('instituicoes/', InstituicaoListCreateView.as_view(), name='api_instituicoes'),
    path('doadores/', DoadorListCreateView.as_view(), name = 'api_doadores'),
    path('projetos/', ProjetoListCreateView.as_view(), name = 'api_projetos'),
    path('doacoes/', DoacaoListCreateView.as_view(), name='api_doacoes'),
    path('necessidades/', NecessidadeListCreateView.as_view(), name= 'api_necessidades'),
    path('voluntariados/', VoluntariadoListCreateView.as_view(), name='api_voluntariados'),
    path('instituicoes/<int:pk>/', InstituicaoDetailView.as_view(), name='instituicao_detail'),
    path('doadores/<int:pk>/', DoadorDetailView.as_view(), name='doador_detail'),
    path('projetos/<int:pk>/', ProjetoDetailView.as_view(), name='projeto_detail'),
    path('doacoes/<int:pk>/', DoacaoDetailView.as_view(), name='doacao_detail'),
    path('necessidades/<int:pk>/', NecessidadeDetailView.as_view(), name='necessidade_detail'),
    path('voluntariados/<int:pk>/', VoluntariadoDetailView.as_view(), name='voluntariado_detail')

]
