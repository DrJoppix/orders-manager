# Orders Manager

## Configurazione BackEnd in Python (Django)

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

- Creazione superuser

  - `python3 manage.py createsuperuser`

- Avvia server

  - `python3 manage.py runserver`

- Avviare i test

  - `python3 manage.py test orders`
