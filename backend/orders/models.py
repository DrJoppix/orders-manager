"""
Modelli per l'app `orders`.

Questo modulo definisce le entità create per rappresentare
prodotti e ordini nel database tramite l'ORM di Django.

Classi:
    - Product: rappresenta un prodotto vendibile.
    - Order: rappresenta un ordine che può contenere più prodotti.
"""

from django.db import models


class Product(models.Model):
    """
    Prodotto acquistabile dall'ordine.

    Attributi:
        name (str): Nome del prodotto.
        price (Decimal): Prezzo del prodotto.
    """

    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.name)


class Order(models.Model):
    """
    Ordine di un cliente, che può contenere uno o più prodotti.

    Attributi:
        name (str): Titolo dell'ordine.
        description (str): Descrizione opzionale dell'ordine.
        date (date): Data dell'ordine, generata col current timestamp alla creazione.
        products (ManyToMany[Product]): Prodotti inclusi nell'ordine.
    """

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField(auto_now_add=True)

    products = models.ManyToManyField(Product, related_name="orders")

    def __str__(self):
        return str(self.name)
