from django.http import HttpResponseForbidden

from django.http import HttpResponseForbidden

def tipo_requerido(tipo_esperado):
    def decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            if hasattr(request.user, 'perfil') and request.user.perfil.tipo == tipo_esperado:
                return view_func(request, *args, **kwargs)
            return HttpResponseForbidden("Acesso não autorizado.")
        return _wrapped_view
    return decorator