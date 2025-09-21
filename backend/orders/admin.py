"""
Configurazioni dell'admin per l'applicazione "orders".
"""

from django.contrib import admin

from .models import Order, Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Configurazioni per l'admin del modello 'Product'.
    """

    list_display = ("id", "name", "price")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """
    Configurazioni per l'admin del modello 'Orders'.
    """

    list_display = ("id", "name", "date")
    filter_horizontal = ("products",)
