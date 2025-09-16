"""
Test CRUD e filtri per gli ordini.
Crea prodotti e ordini di prova nel setup.
"""

import datetime
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Order, Product


class OrderAPITest(TestCase):
    """
    Test CRUD e filtri per gli ordini.
    Crea prodotti e ordini di prova nel setup.
    """

    def setUp(self):
        self.client = APIClient()
        # Crea prodotti di prova
        self.product1 = Product.objects.create(
            name="Prodotto 1",
            price=10,
        )
        self.product2 = Product.objects.create(
            name="Prodotto 2",
            price=20,
        )

        # Crea ordini di prova
        self.order1 = Order.objects.create(
            name="Ordine A",
            description="Test A",
            date=datetime.date(2025, 9, 16),
        )
        self.order1.products.set([self.product1])

        self.order2 = Order.objects.create(
            name="Ordine B",
            description="Test B",
            date=datetime.date(2025, 9, 17),
        )
        self.order2.products.set([self.product1, self.product2])

    def test_list_orders(self):
        """
        Test del GET del listato degli ordini.
        2 ordini creati nel setup, devono ritornare entrambi.
        """
        url = reverse("order-list")
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )
        self.assertEqual(
            len(response.data),
            2,
        )

    def test_retrieve_order(self):
        """
        Test del GET di un singolo ordine.
        Controlla che i dati ritornati siano corretti.
        2 prodotti associati all'ordine 2.
        """
        url = reverse(
            "order-detail",
            args=[self.order2.id],
        )
        response = self.client.get(url)
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )
        self.assertEqual(
            response.data["name"],
            self.order2.name,
        )
        self.assertEqual(
            len(response.data["products"]),
            2,
        )

    def test_create_order(self):
        """
        Test del POST per creare un nuovo ordine.
        Controlla che l'ordine venga creato correttamente.
        """
        url = reverse("order-list")
        data = {
            "name": "Ordine C",
            "description": "Test C",
            "date": "2025-09-18",
            "products": [self.product2.id],
        }
        response = self.client.post(
            url,
            data,
            format="json",
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )
        self.assertEqual(
            Order.objects.count(),
            3,
        )

    def test_search_order(self):
        """
        Test del filtro di ricerca per nome.
        Crea un ordine con nome "Ordine A" e cerca "A".
        Deve restituire solo quell'ordine.
        """
        url = reverse("order-list")
        response = self.client.get(
            url,
            {"search": "A"},
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )
        self.assertEqual(
            len(response.data),
            1,
        )
        self.assertEqual(
            response.data[0]["name"],
            "Ordine A",
        )
