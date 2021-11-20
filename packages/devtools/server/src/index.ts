#!/usr/bin/env node
import {server as WebSocketServer, connection} from 'websocket'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

const server = http.createServer(app)

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
  maxReceivedFrameSize: 100000000,
  maxReceivedMessageSize: 100000000,
})

function originIsAllowed(origin: string) {
  // put logic here to detect whether the specified origin is allowed.
  return true
}

let dashboard: connection | undefined
let phone: connection | undefined

wsServer.on('request', function (request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject()
    console.log(
      new Date() + ' Connection from origin ' + request.origin + ' rejected.',
    )
    return
  }

  if (request.resource === '/dashboard') {
    console.log('dashboard connected')
    if (dashboard) {
      dashboard.drop()
    }
    dashboard = request.accept('echo-protocol', request.origin)

    dashboard.on('message', function (message) {
      if (message.type === 'utf8') {
        console.log('Message forwarded from dashboard to phone')
        if (phone) {
          phone.send(message.utf8Data as string)
        }
      }
    })
    dashboard.on('close', function (reasonCode, description) {
      console.log('dashboard disconnected')
    })
    return
  } else if (request.resource === '/phone') {
    console.log('phone connected')
    if (phone) {
      phone.drop()
    }
    phone = request.accept('echo-protocol', request.origin)

    if (dashboard) {
      dashboard.send(
        JSON.stringify({
          type: 'phone connected',
        }),
      )
    }

    phone.on('message', function (message) {
      if (message.type === 'utf8') {
        console.log('Message forwarded from dashboard to dashboard')
        if (dashboard) {
          dashboard.send(message.utf8Data as string)
        }
      }
    })

    phone.on('close', function (reasonCode, description) {
      console.log('phone disconnected')
      if (dashboard) {
        dashboard.send(
          JSON.stringify({
            type: 'phone disconnected',
          }),
        )
      }
    })
  }
})

const port = 9100
server.listen(port, function () {
  console.log(
    `${new Date()} Server is listening at ${require('ip').address()}:${port}`,
  )
})
