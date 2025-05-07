from django.contrib import admin

from .models import (
    Categoria, Instituicao, Doador, Projeto,
    Doacao, Necessidade, Voluntariado
)

admin.site.register(Categoria)
admin.site.register(Instituicao)
admin.site.register(Doador)
admin.site.register(Projeto)
admin.site.register(Doacao)
admin.site.register(Necessidade)
admin.site.register(Voluntariado)