import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import OrderCreateView from '@/views/OrderCreateView.vue'

// Mock del servizio products
vi.mock('@/services/products', () => ({
  fetchProducts: vi.fn(() =>
    Promise.resolve([
      { id: 1, name: 'Prodotto 1', price: '10' },
      { id: 2, name: 'Prodotto 2', price: '20' },
    ]),
  ),
}))

describe('OrderCreateView', () => {
  it('mostra i prodotti caricati dal mock', async () => {
    const wrapper = mount(OrderCreateView)

    // aspetta che tutte le Promise si risolvano
    await flushPromises()

    expect(wrapper.text()).toContain('Prodotto 1')
    expect(wrapper.text()).toContain('Prodotto 2')
  })
})
