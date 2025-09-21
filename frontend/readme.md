# Documentazione funzionalità del FE

## Views

- **Orders List** (`/orders`): Pagina per visualizzare tutti gli ordini creati. Da qui, si può accedere alla pagina di dettaglio o modifica dei singoli.
- **Order Detail** (`/orders/:id`): Pagina per visualizzare i dettagli di un ordine specifico. Da qui, si può eliminare l'ordine o accedere alla pagina di modifica.
- **Order Edit** (`/orders/:id/edit`): Pagina per modificare un ordine esistente. Da qui, si possono salvare le modifiche o tornare alla pagina di dettaglio.
- **Order Create** (`/orders/create`): Pagina per creare un nuovo ordine. Da qui, si possono aggiungere i dettagli dell'ordine, inclusi i prodotti, e salvare l'ordine.
- **Product List** (`/products`): Pagina per visualizzare tutti i prodotti disponibili. Non ne ho implementato la modifica o creazione, poiché mi aspetto che idealmente esista un pannello di admin per gestire i prodotti, ed un eventuale autenticazione.
- **Home** (`/`): Pagina principale che reindirizza alla lista degli ordini.

## Services

- **Orders**: Servizio per gestire le operazioni CRUD sugli ordini, inclusa la gestione dei prodotti associati.

  - `createOrder(form)`: Crea un nuovo ordine. Contatta l'endpoint `POST /api/orders/`.
  - `fetchOrders(filters)`: Recupera la lista di tutti gli ordini, con supporto per filtri di ricerca. Contatta l'endpoint `GET /api/orders/`.
  - `fetchOrder(id)`: Recupera i dettagli di un ordine specifico. Contatta l'endpoint `GET /api/orders/:id/`.
  - `fetchOrderWithProducts(id)`: Recupera i dettagli di un ordine specifico, inclusi i prodotti associati. Contatta l'endpoint `GET /api/orders/:id/`. Richiama `fetchProduct(id)` per ogni prodotto associato.
  - `updateOrder(id, order)`: Aggiorna un ordine esistente. Contatta l'endpoint `PUT /api/orders/:id/`.
  - `deleteOrder(id)`: Elimina un ordine esistente. Contatta l'endpoint `DELETE /api/orders/:id/`.

- **Products**: Servizio per gestire le operazioni di lettura sui prodotti.
  - `fetchProducts(filters)`: Recupera la lista di tutti i prodotti, con supporto per filtri di ricerca. Contatta l'endpoint `GET /api/products/`.
  - `fetchProduct(id)`: Recupera i dettagli di un prodotto specifico. Contatta l'endpoint `GET /api/products/:id/`.

## Variabili d'ambiente

- Ambiente di sviluppo (`.env.development`):
  - `VITE_API_BASE_URL`: URL base per le chiamate API. Di default, è impostato a `http://127.0.0.1:8000/api/`, ma può essere modificato in caso non si apra nella porta corretta.
