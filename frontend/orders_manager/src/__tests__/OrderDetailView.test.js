import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import OrderDetailView from '@/views/OrderDetailView.vue'

// Mock del servizio orders
vi.mock('@/services/orders', () => ({
  fetchOrderWithProducts: vi.fn(() =>
    Promise.resolve({
      id: 1,
      name: 'Ordine A',
      date: '2025-09-01',
      description: 'Test ordine A',
      products: [
        {
          id: 1,
          name: 'Prodotto 1',
          price: 10.0,
        },
        {
          id: 2,
          name: 'Prodotto 2',
          price: 20.0,
        },
      ],
    }),
  ),
}))

// mock useRouter di vue-router
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: 1 } }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('OrderDetailView', () => {
  it('mostra l\'ordine con i prodotti caricati dal mock', async () => {
    const wrapper = mount(OrderDetailView, {
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

    expect(wrapper.text()).toContain('Ordine A')
    expect(wrapper.text()).toContain('Prodotto 1')
    expect(wrapper.text()).toContain('Prodotto 2')
  })
})
