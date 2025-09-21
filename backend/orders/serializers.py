"""
Serializers per l'app orders.
Servono a trasformare i modelli Django in JSON e viceversa.
"""

from rest_framework import serializers

from .models import Order, Product


# pylint: disable=too-few-public-methods
class ProductSerializer(serializers.ModelSerializer):
    """Trasforma i prodotti in JSON e viceversa."""

    class Meta:
        """Meta configurazione del serializer per Product."""

        model = Product
        fields = ["id", "name", "price"]


class OrderSerializer(serializers.ModelSerializer):
    """Trasforma il modello Order in JSON e viceversa."""

    class Meta:
        """Meta configurazione del serializer per Order."""

        model = Order
        fields = ["id", "name", "description", "date", "products"]
