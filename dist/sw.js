'use strict'

self.addEventListener('push', event => {
  let payload = event.data.json()
  console.log('push received')
  self.registration.showNotification(payload.title, {
    console.log('show notification!')
    body: payload.body,
    icon: payload.icon
  })
})
