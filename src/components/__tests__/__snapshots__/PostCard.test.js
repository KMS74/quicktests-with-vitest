import axios from 'axios'
import { mount, flushPromises } from '@vue/test-utils'
import PostCard from '@/components/PostCard.vue'
import { expect, vi, describe, test } from 'vitest'

const mockResponse = {
  data: {
    userId: 1,
    id: 1,
    title: 'mock title',
    body: 'mock body'
  }
}

describe('PostCard', () => {
  test('should fetch and render post', async () => {
    // mock axios.get to resolve the promise
    // intercept the axios.get call and return a resolved promise with mockResponse
    // this way we can test the component without making an actual HTTP request
    vi.spyOn(axios, 'get').mockResolvedValue(mockResponse)
    const wrapper = mount(PostCard)

    expect(wrapper.text()).toContain('Loading...')

    // wait for promise to resolve and update the DOM
    await flushPromises()

    expect(wrapper.find('[data-testid="post-title"]').text()).toBe(mockResponse.data.title)
    expect(wrapper.find('[data-testid="post-body"]').text()).toBe(mockResponse.data.body)
  })

  test('should render error message when fails', async () => {
    // mock axios.get to reject the promise
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('error occurred'))
    const wrapper = mount(PostCard)

    expect(wrapper.text()).toContain('Loading...')

    await flushPromises()

    expect(wrapper.find('[data-testid="error-message"]').text()).toBe('error occurred')
  })
})
