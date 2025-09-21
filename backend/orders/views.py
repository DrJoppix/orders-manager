"""
View per l'app orders.
Definiscono gli endpoint per le operazioni CRUD.
"""

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets

from .models import Order, Product
from .serializers import OrderSerializer, ProductSerializer


# pylint: disable=no-member,too-many-ancestors
class OrderViewSet(viewsets.ModelViewSet):
    """
    Fornisce gli endpoint CRUD per gli ordini:
    - list
    - retrieve
    - create
    - update
    - delete
    """

    queryset = Order.objects.all().order_by("-date")
    serializer_class = OrderSerializer
    filter_backends = [
        filters.SearchFilter,
        DjangoFilterBackend,  # necessario per filtrare dalla data esatta
        filters.OrderingFilter,
    ]
    search_fields = [
        "name",
        "description",
    ]
    filterset_fields = ["date"]
    ordering_fields = ["name", "date"]


class ProductViewSet(viewsets.ModelViewSet):
    """
    Fornisce gli endpoint CRUD per i prodotti:
    - list
    - retrieve
    - create
    - update
    - delete
    """

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name"]
    ordering_fields = ["name", "price"]
