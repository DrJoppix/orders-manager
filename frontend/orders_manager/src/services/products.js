const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Servizio per gestire il fetch dei prodotti.
 *
 * @returns Array di prodotti
 */
export async function fetchProducts(filters = {}) {
  let url = new URL(`${API_BASE_URL}products/`)
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      url.searchParams.append(key, filters[key])
    }
  })
  try {
    const res = await fetch(url)
    if (!res.ok) {
      alert('Errore fetch prodotti')
      throw new Error('Errore fetch prodotti')
    }
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

/**
 * Servizio per fetchare i dettagli di un prodotto specifico.
 *
 * @param Integer id. ID del prodotto da fetchare
 * @returns Dettagli del prodotto
 */
export async function fetchProduct(id) {
  let url = new URL(`${API_BASE_URL}products/${id}/`)

  try {
    const res = await fetch(url)
    if (!res.ok) {
      alert(`Errore fetch prodotto ${id}`)
      throw new Error(`Errore fetch prodotto ${id}`)
    }
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}
