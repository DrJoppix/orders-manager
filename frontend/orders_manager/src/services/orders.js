import { fetchProduct } from '@/services/products'

/**
 * Crea un nuovo ordine.
 * Restituisco la response del server, così da poter leggere lo status code.
 * Lato view, devo gestire l'aggiornamento dell'oggetto ordine,
 * e il flag per mostrare il link per la pagina di dettaglio.
 *
 * @param Array form. Dati dell'ordine da creare
 * @returns Response del server
 */
export async function createOrder(form) {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      throw new Error('Errore creazione ordine')
    }

    return res
  } catch (err) {
    console.error(err)
  }
}

/**
 * Fetch i dettagli di un ordine.
 * NB: non include i dettagli dei prodotti, solo gli ID.
 *
 * @param Integer id. ID dell'ordine da fetchare
 * @returns Dettagli dell'ordine
 */
export async function fetchOrder(id) {
  let url = new URL(`http://127.0.0.1:8000/api/orders/${id}/`)

  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Errore fetch ordine${id}`)
    }
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

/**
 * Fetch i dettagli di un ordine, inclusi i dettagli dei prodotti.
 *
 * @param Integer id. ID dell'ordine da fetchare
 * @returns Dettagli dell'ordine, inclusi i dettagli dei prodotti.
 */
export async function fetchOrderWithProducts(id) {
  let url = new URL(`http://127.0.0.1:8000/api/orders/${id}/`)

  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Errore fetch ordine')
    }
    const data = await res.json()

    // order.products contiene solo gli id, cicliamo e fetchiamo i dettagli
    if (Array.isArray(data.products)) {
      const productDetails = await Promise.all(
        data.products.map(async (id) => {
          return await fetchProduct(id)
        }),
      )
      data.products = productDetails
    }

    return data
  } catch (err) {
    console.error(err)
  }
}

/**
 * Servizio per fetchare i dettagli di un prodotto specifico.
 *
 * @param Integer id. ID del prodotto da fetchare
 * @param Object product. Oggetto prodotto da aggiornare
 *
 * @returns Dettagli del prodotto
 */
export async function updateOrder(id, order) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/orders/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })

    if (!res.ok) {
      throw new Error('Errore aggioramento ordine')
    }

    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

/**
 * Fetch della lista degli ordini con filtri opzionali.
 *
 * @param Object filters. Oggetto con i filtri da applicare (search, name, date, ordering)
 *
 * @returns Array di ordini
 */
export async function fetchOrders(filters) {
  let url = new URL('http://127.0.0.1:8000/api/orders/')

  if (filters?.search) {
    url.searchParams.append('search', filters.search)
  }
  if (filters?.name) {
    url.searchParams.append('name', filters.name)
  }
  if (filters?.date) {
    url.searchParams.append('date', filters.date)
  }
  if (filters?.ordering) {
    url.searchParams.append('ordering', filters.ordering)
  }

  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Errore fetch ordini')
    }
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}
