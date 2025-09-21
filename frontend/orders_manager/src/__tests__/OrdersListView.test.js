import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import OrdersListView from '@/views/OrdersListView.vue'

// Mock del servizio orders
vi.mock('@/services/orders', () => ({
  fetchOrders: vi.fn(() =>
    Promise.resolve([
      { id: 1, name: 'Ordine A', date: '2025-09-01', description: 'Test ordine A' },
      { id: 2, name: 'Ordine B', date: '2025-09-02', description: 'Test ordine B' },
    ]),
  ),
}))

describe('OrdersListView', () => {
  it('mostra gli ordini caricati dal mock', async () => {
    const wrapper = mount(OrdersListView)

    // aspetta che tutte le Promise si risolvano
    await flushPromises()

    expect(wrapper.text()).toContain('Ordine A')
    expect(wrapper.text()).toContain('Ordine B')
  })
})
