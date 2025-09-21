# Documentazione Docker

La cartella di lavoro del container è `/app`, dove verrano installate le dipendenze ed i progetti.

## Dockerfile Backend

Dockerfile per le funzionalità di Backend, basata su Python 3.13 versione slim.
Questo Dockerfile prenderà le dipendenze del progetto dal file `requirements.txt`, aggiornando `pip` ed installando tutte le dipendenze.
La porta esposta sarà la `8000`.

## Dockerfile Frontend

Dockerfile per le funzionalità di Frontend, basata su Node 23, versione di Alpine Linux (più leggera).
Questo Dockerfile prenderà le dipendenze del progetto dal file `package.json` e `package-lock.json` nella cartella interna del frontend, installandole.
La porta esposta sarà la `5173`, default per Vite.

## Docked Compose

Per semplicità, inserito nella root del progetto.
Questo file creerà 3 servizi:

- `backend`
  - Prende i dati da `Dockerfile.backend`
  - Apre il range di porte `8000:8000`
  - Dipende dal servizio `db`
- `frontend`
  - Prende i dati da `Dockerfile.frontend`
  - Apre il range di porte `5173:5173`
  - Crea una variabile di ambiente `VITE_API_URL=http://backend:8000/api/`, per dire di utilizzare l'istanza del backend per le chiamate API
  - Dipende dal servizio `backend`
- `db`
  - Database in `PostgreSQL 17`
  - Apre il range di porte `5432:5432`
  - Imposta delle variabili di ambiente per user e password standard per Postgre
