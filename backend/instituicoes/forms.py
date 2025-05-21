from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CadastroUsuarioForm(UserCreationForm):   #a classe está herdando da classe UserCreationForm
    email = forms.EmailField(required=True)

    class Meta:
        model = User  #indica com qual modelo o form está relacionado
        fields = ['username', 'email', 'password1', 'password2']  #quais campos vão aparecer no formulário
