from rest_framework import serializers
from .models import (
    Instituicao, Doador, Projeto, 
    Doacao,Necessidade, Voluntariado)


class InstituicaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instituicao
        fields = '__all__'
        read_only_fields = ['data_cadastro']

class DoadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doador
        fields = '__all__'

class ProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projeto
        fields = '__all__'

class DoacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doacao
        fields = '__all__'

class NecessidadeSerializer (serializers.ModelSerializer):
    class Meta:
        model = Necessidade
        fields = '__all__'

class VoluntariadoSerializer (serializers.ModelSerializer):
    class Meta:
        model = Voluntariado
        fields = '__all__'
