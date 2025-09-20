/**
 * Servizio per gestire il fetch dei prodotti.
 *
 * @returns Array di prodotti
 */
export async function fetchProducts() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/products/')
    if (!res.ok) {
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
  let url = new URL(`http://127.0.0.1:8000/api/products/${id}/`)

  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Errore fetch prodotto ${id}`)
    }
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}
