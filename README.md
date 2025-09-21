# Orders Manager

## Configurazione BackEnd in Django

- Creazione Virtual Environment

  - Installazione pachetto (facoltativo, se già presente)
    - `sudo apt-get install python3-venv`
  - Creazione e attivazione ambiente virtuale tramite `venv`
    - `cd backend`
    - `python3 -m venv .venv`
    - `source .venv/bin/activate`

- Aggiornamento `pip` e installazione dipendenze

  - `pip install --upgrade pip`
  - `pip install -r requirements.txt`

- Aggiornare all'ultima migration

  - `python3 manage.py migrate`

- Avvia server

  - `python3 manage.py runserver`
  - Lasciare il terminale aperto per far funionare gli endpoint del BE.

### Test tramite pannello Admin

È possibile testare dal pannello admin i soli endpoint.
In quel caso, sarà necessario creare un superuser tramite il comando guidato

- `python3 manage.py createsuperuser`

Fatto ciò, si potranno testare gli endpoint dal path

- `http://127.0.0.1:8000/admin`

### Avviare l'ambiente BE dal secondo avvio in poi

Una volta inizializzato già tutto, basterà riattivare l'ambiente virtuale ed avviare il server.

- `cd backend`
- `source .venv/bin/activate`
- `python3 manage.py runserver`

### Avviare i test

- `python3 manage.py test orders`

## Configurazione FrontEnd in Vue.js

In un altro terminale:

- `cd frontend`
- `npm install`
- `npm run dev`
- Lasciare il terminale aperto
- Andrare sul link mostrato sul terminale

### Avviare l'ambiente FE dal secondo avvio in poi

Basterà avviare l'ambiente dev

- `npm run dev`

### Variabili d'ambiente

È presente la variabile di ambiente `VITE_API_BASE_URL` che corrisponde agli endpoint del BE.
Di default, ho già inserito `http://127.0.0.1:8000/api/`, ovvero il default di Django.
In caso non si apra nella porta di default, modificarlo dal file `.env.development`
