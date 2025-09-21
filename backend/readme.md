# Documentazione Funzionalità del BE

## Entità

- Orders
  - id: PK, int
  - name: varchar(100)
  - description: text, opzionale
  - date: current date
  - products: FK, ManyToMany, Products
- Products
  - id: PK, int
  - name: varchar(100)
  - price: decimal(10,2)

## API Endpoints

Endpoint di Orders:

- `GET /api/orders/`: Lista tutti gli ordini
  - Parametri:
    - `search`: Filtra ordini per nome o descrizione (es. `/api/orders/?search=ordine1`)
    - `ordering`: Ordina ordini per data o nome (es. `/api/orders/?ordering=-date` per ordine decrescente)
    - `date`: Filtra ordini per data specifica (es. `/api/orders/?date=2023-10-01`)
- `GET /api/orders/<id>/`: Dettagli di un ordine specifico
- `POST /api/orders/`: Crea un nuovo ordine
- `PUT /api/orders/<id>/`: Aggiorna un ordine esistente
- `DELETE /api/orders/<id>/`: Elimina un ordine

Endpoint di Products:

- `GET /api/products/`: Lista tutti i prodotti
  - Parametri:
    - `search`: Filtra prodotti per nome (es. `/api/products/?search=prodotto1`)
    - `ordering`: Ordina prodotti per prezzo o nome (es. `/api/products/?ordering=price` per ordine crescente)
- `GET /api/products/<id>/`: Dettagli di un prodotto specifico
- `POST /api/products/`: Crea un nuovo prodotto
- `PUT /api/products/<id>/`: Aggiorna un prodotto esistente
- `DELETE /api/products/<id>/`: Elimina un prodotto

## Pannello Admin

- Accessibile come superuser sul path `/admin/`
- Permette di effettuare operazioni CRUD sulle entità tramite interfaccia web

## Testing

- Test automatici per gli endpoint di Orders
- Comando per eseguire i test: `python3 manage.py test orders`
- NB: Siccome popolo il DB con 3 ordini e 3 prodotti direttamente dalla migration, ho dovuto modificare di conseguenza i test per considerare non un DB vuoto, ma bensì uno coi dati già popolati.
