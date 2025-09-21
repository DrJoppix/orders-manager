# Orders Manager

Il progetto è un'applicazione web per la gestione di ordini, sviluppata con un backend in **Django** e un frontend in **Vue.js**.
Permette di visualizzare, creare, modificare e cancellare ordini tramite un'interfaccia utente intuitiva.

Il progetto è strutturato in due cartelle principali

- `backend` per il codice Django.
- `frontend` per il codice Vue.js.

È presente anche un file `docker-compose.yml` per facilitare l'avvio dell'ambiente di sviluppo tramite Docker, che prenderà in carico sia il backend che il frontend, tramite i rispettivi Dockerfile.

## Problema Ancora Non Risolto con Docker

Purtroppo, se non si effettuano tutte le configurazioni lato Backend manuali, non funziona il container di Docker.
Quindi, come prima cosa comunque **configurare l'ambiente Backend in Django** e poi **avviare il container Docker**

## Configurazione ambiente BackEnd in Django

- Creazione Virtual Environment

  - Installazione pachetto (**facoltativo**, se già presente)
    - `sudo apt-get install python3-venv`
  - Creazione e attivazione ambiente virtuale tramite `venv`
    - `cd backend`
    - `python3 -m venv .venv`
    - `source .venv/bin/activate`

- Aggiornamento `pip`

  - `pip install --upgrade pip`

- Installazione dipendenze

  - `pip install -r requirements.txt`

- Aggiornare all'ultima migration

  - `python3 manage.py migrate`

### Avvia server

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

### Avviare i test BE

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

### Avviare i test FE

- `cd frontend`
- `npm run test`

### Variabili d'ambiente

È presente la variabile di ambiente `VITE_API_BASE_URL` che corrisponde agli endpoint del BE.
Di default, ho già inserito `http://127.0.0.1:8000/api/`, ovvero il default di Django.
In caso non si apra nella porta di default, modificarlo dal file `.env.development`

## Avvio Progetto tramite Docker

### Build tramite Docker

- Comando di build
  - `docker-compose build`
- Comando di avvio
  - `docker-compose up`
  - Comandi alternativi
    - Comando di avvio in background: `docker compose up -d`
    - Comando di build ed avvio in un solo comando: `docker compose up --build`
- Comando di stop
  - `docker compose down`
- Comando per svuotare completamente i volumi non più utilizzati e liberare la memoria (sarà necessario ribuildare docker)
  - `docker system prune -a --volumes`

#### Problemi noti

- Via WSL2 non riesce a collegare l'utente al gruppo `docker`, quindi ogni comando docker va lanciato con `sudo`.

## Built With

[![Built With](https://skillicons.dev/icons?i=python,django,npm,vue,vite,docker)](https://skillicons.dev)
