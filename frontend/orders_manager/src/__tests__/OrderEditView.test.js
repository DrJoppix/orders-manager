import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import OrderEditView from '@/views/OrderEditView.vue'

// Mock del servizio orders
vi.mock('@/services/orders', () => ({
  fetchOrder: vi.fn(() =>
    Promise.resolve({
      id: 1,
      name: 'Ordine A',
      date: '2025-09-01',
      description: 'Test ordine A',
    }),
  ),
}))

// Mock del servizio products
vi.mock('@/services/products', () => ({
  fetchProducts: vi.fn(() =>
    Promise.resolve([
      { id: 1, name: 'Prodotto 1', price: '10' },
      { id: 2, name: 'Prodotto 2', price: '20' },
    ]),
  ),
}))

// mock useRouter di vue-router
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: 1 } }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('OrderEditView', () => {
  it('mostra l\'ordine ed i prodotti caricati dal mock', async () => {
    const wrapper = mount(OrderEditView, {
      global: {
        mocks: {
          $route: {
            params: { id: 1 },
          },
        },
      },
    })

    // aspetta che tutte le Promise si risolvano
    await flushPromises()

    expect(wrapper.text()).toContain('ordine 1')
    expect(wrapper.text()).toContain('Prodotto 1')
    expect(wrapper.text()).toContain('Prodotto 2')
  })
})
