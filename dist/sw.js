'use strict'

self.addEventListener('push', event => {
  let payload = event.data.json()
  self.registration.showNotification(payload.title, {
    body: payload.body,
    icon: payload.icon
  })
})
