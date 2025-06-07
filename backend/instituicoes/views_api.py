from rest_framework import generics
from .models import (
    Doador, Instituicao, Projeto, Doacao,
    Voluntariado, Necessidade)

from .serializers import (
    InstituicaoSerializer, DoadorSerializer, 
    ProjetoSerializer, DoacaoSerializer,
    NecessidadeSerializer, VoluntariadoSerializer)


class InstituicaoListCreateView(generics.ListCreateAPIView):
    queryset = Instituicao.objects.all()
    serializer_class = InstituicaoSerializer

class InstituicaoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Instituicao.objects.all()
    serializer_class = InstituicaoSerializer



class DoadorListCreateView(generics.ListCreateAPIView):
    queryset = Doador.objects.all()
    serializer_class = DoadorSerializer

class DoadorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doador.objects.all()
    serializer_class = DoadorSerializer



class ProjetoListCreateView(generics.ListCreateAPIView):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer 

class ProjetoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer 



class DoacaoListCreateView(generics.ListCreateAPIView):
    queryset = Doacao.objects.all()
    serializer_class = DoacaoSerializer

class DoacaoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doacao.objects.all()
    serializer_class = DoacaoSerializer



class NecessidadeListCreateView(generics.ListCreateAPIView):
    queryset = Necessidade.objects.all()
    serializer_class = NecessidadeSerializer

class NecessidadeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Necessidade.objects.all()
    serializer_class = NecessidadeSerializer



class VoluntariadoListCreateView (generics.ListCreateAPIView):
    queryset = Voluntariado.objects.all()
    serializer_class = VoluntariadoSerializer

class VoluntariadoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Voluntariado.objects.all()
    serializer_class = VoluntariadoSerializer