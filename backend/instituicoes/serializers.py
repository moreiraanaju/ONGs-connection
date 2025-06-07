from rest_framework import serializers
from .models import (
    Instituicao, Doador, Projeto, 
    Doacao,Necessidade, Voluntariado)


class InstituicaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instituicao
        fields = '__all__'
        read_only_fields = ['data_cadastro']

    def validate(self, data):
        cnpj = data.get('cnpj')
        if not cnpj or len(cnpj) != 14 or not cnpj.isdigit():
            raise serializers.ValidationError({
                'cnpj': 'CNPJ deve conter exatamente 14 dígitos numéricos.'
            })
        return data



class DoadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doador
        fields = '__all__'

    def validate(self, data):
        tipo = data.get('tipo')
        cpf_cnpj = data.get('cpf_cnpj')

        if tipo == 'Pessoa Física':
            if not cpf_cnpj or len(cpf_cnpj) != 11 or not cpf_cnpj.isdigit():
                raise serializers.ValidationError({'cpf_cnpj': 'CPF deve conter exatamente 11 dígitos numéricos.'})
        elif tipo == 'Pessoa Jurídica':
            if not cpf_cnpj or len(cpf_cnpj) != 14 or not cpf_cnpj.isdigit():
                raise serializers.ValidationError({'cpf_cnpj': 'CNPJ deve conter exatamente 14 dígitos numéricos.'})
        return data

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
