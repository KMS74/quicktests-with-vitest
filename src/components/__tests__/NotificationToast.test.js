import { mount } from '@vue/test-utils'
import NotificationToast from '../NotificationToast.vue'
import { describe, expect, test } from 'vitest'

describe('NotificationToast', () => {
  test('renders the correct style for error', () => {
    const status = 'error'

    const wrapper = mount(NotificationToast, {
      props: { status }
    })

    expect(wrapper.classes()).toContain('notification--error')
  })

  // snapshot test: means that the rendered output of the component is compared to a reference image
  test('renders the correct style for success', () => {
    const status = 'success'

    const wrapper = mount(NotificationToast, {
      props: { status }
    })

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div role="alert" class="notification notification--success">
        <p class="notification__text"></p><button title="close" class="notification__button"> ✕ </button>
      </div>"
    `)
  })

  test('should render the passed message prop', () => {
    const message = 'This is a test message'
    const wrapper = mount(NotificationToast, {
      props: { message }
    })

    expect(wrapper.find('p').text()).toBe(message)
  })

  test('notification slides up when message is empty', () => {
    const message = ''
    const wrapper = mount(NotificationToast, {
      props: { message }
    })

    expect(wrapper.classes('notification--slide')).toBe(false)
  })

  test('should emit clear-notification event when close button is clicked', async () => {
    const message = 'This is a test message'
    const wrapper = mount(NotificationToast, {
      props: { message }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('clear-notification')
  })
})
