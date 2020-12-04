const mkOpen = ({ wsP, redis, connP }) => {
  const ping = JSON.stringify({ t: 8 })
  const joinchat = JSON.stringify({ t: 1, d: { topic: 'chat' } })
  let pingIntervalId = 0

  return async ({ connId, serverInterval, serverAttempts, clientInterval, clientAttempts }) => {
    const dt = Number(clientInterval)
    const ws = await wsP

    // must send pings
    clearInterval(pingIntervalId)
    pingIntervalId = setInterval(() => ws.send(ping), dt)

    // join chat room
    ws.send(joinchat)
  }
}

module.exports = mkOpen
