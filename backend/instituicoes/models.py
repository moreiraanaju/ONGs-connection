from django.db import models


class Categoria(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.TextField(blank=True, null=True)
    icone = models.URLField(max_length=255, blank=True, null=True)  

    def __str__(self):
        return f'Categoria: {self.nome}'  



class Instituicao(models.Model):
    nome = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=14, unique=True)
    descricao = models.TextField(blank=True, null=True)
    endereco = models.CharField(max_length=200, blank=True, null=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=100, unique=True)
    site = models.URLField(max_length=100, blank=True, null=True)
    data_fundacao = models.DateField(blank=True, null=True)

    STATUS_CHOICES = [
        ('Ativo', 'Ativo'),
        ('Inativo', 'Inativo'),
        ('Pendente', 'Pendente'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pendente')

    data_cadastro = models.DateTimeField(auto_now_add=True)
    logo_url = models.URLField(max_length=255, blank=True, null=True)
    areas_atuacao = models.TextField(blank=True, null=True)
    categorias = models.ManyToManyField('Categoria', related_name='instituicoes', blank=True)  

    def __str__(self):
        return f'Instituição: {self.nome} (CNPJ: {self.cnpj})'  



class Doador(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    cpf_cnpj = models.CharField(max_length=14, unique=True, blank=True, null=True)

    TIPO_CHOICES = [
        ('Pessoa Física', 'Pessoa Física'),
        ('Pessoa Jurídica', 'Pessoa Jurídica'),
    ]
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)

    data_nascimento = models.DateField(blank=True, null=True)
    endereco = models.CharField(max_length=200, blank=True, null=True)
    data_cadastro = models.DateTimeField(auto_now_add=True)
    newsletter = models.BooleanField(default=True)
    termo_aceite = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.nome} ({self.tipo})'  



class Projeto(models.Model):
    nome = models.CharField(max_length=100)
    instituicao = models.ForeignKey('Instituicao', on_delete=models.CASCADE)
    descricao = models.TextField()
    data_inicio = models.DateField(blank=True, null=True)
    data_fim = models.DateField(blank=True, null=True)
    meta_financeira = models.DecimalField(max_digits=10, decimal_places=2)
    valor_arrecadado = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    STATUS_CHOICES = [
        ('Em andamento', 'Em andamento'),
        ('Concluído', 'Concluído'),
        ('Cancelado', 'Cancelado'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Em andamento')
    imagem_url = models.URLField(max_length=255, blank=True, null=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    categorias = models.ManyToManyField('Categoria', related_name='projetos', blank=True)

    def __str__(self):
        return f'Projeto: {self.nome} ({self.status})'  



class Doacao(models.Model):
    doador = models.ForeignKey('Doador', on_delete=models.PROTECT)
    projeto = models.ForeignKey('Projeto', on_delete=models.PROTECT)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data_doacao = models.DateTimeField(auto_now_add=True)

    TIPO_CHOICES = [
        ('Financeira', 'Financeira'),
        ('Material', 'Material'),
    ]
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    descricao_material = models.TextField(blank=True, null=True)

    STATUS_CHOICES = [
        ('Pendente', 'Pendente'),
        ('Confirmada', 'Confirmada'),
        ('Cancelada', 'Cancelada'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pendente')
    metodo_pagamento = models.CharField(max_length=50, blank=True, null=True)
    codigo_transacao = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f'{self.doador.nome} → {self.projeto.nome} ({self.valor} R$)' 


class Necessidade(models.Model):
    instituicao = models.ForeignKey('Instituicao', on_delete=models.PROTECT)
    projeto = models.ForeignKey('Projeto', on_delete=models.PROTECT)
    descricao = models.TextField()
    quantidade = models.IntegerField(blank=True, null=True)
    unidade = models.CharField(max_length=20, blank=True, null=True)

    STATUS_CHOICES = [
        ('Aberta', 'Aberta'),
        ('Atendida', 'Atendida'),
        ('Cancelada', 'Cancelada'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Aberta')
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atendimento = models.DateField(blank=True, null=True)

    def __str__(self):
        return f'Necessidade: {self.descricao[:30]}... (Projeto: {self.projeto.nome})'



class Voluntariado(models.Model):
    doador = models.ForeignKey('Doador', on_delete=models.PROTECT)
    projeto = models.ForeignKey('Projeto', on_delete=models.PROTECT)
    funcao = models.CharField(max_length=100)
    horas_dedicadas = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    data_inicio = models.DateField(blank=True, null=True)
    data_fim = models.DateField(blank=True, null=True)

    STATUS_CHOICES = [
        ('Ativo', 'Ativo'),
        ('Concluído', 'Concluído'),
        ('Cancelado', 'Cancelado'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Ativo')
    habilidades = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'Voluntário: {self.doador.nome} no projeto {self.projeto.nome}'
