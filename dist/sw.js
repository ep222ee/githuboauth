'use strict'

console.log('succesfully loaded sw')

self.addEventListener('push', event => {
  let payload = event.data.json()
  console.log('push received')
  self.registration.showNotification(payload.title, {
    body: 'payload body',
    icon: 'payload avatar url?'
  })
})
