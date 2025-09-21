"""
File per le configurazioni dell'applicazione "orders".
"""

from django.apps import AppConfig


class OrdersConfig(AppConfig):
    """
    Configurazioni per l'applicazione 'orders'.
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "orders"
