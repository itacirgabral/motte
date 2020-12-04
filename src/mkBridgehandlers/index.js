const mkEvent = require('./mkEvent')
const mkJoin = require('./mkJoin')
const mkJoinAck = require('./mkJoinAck')
const mkJoinError = require('./mkJoinError')
const mkLeave = require('./mkLeave')
const mkLeaveAck = require('./mkLeaveAck')
const mkLeaveError = require('./mkLeaveError')
const mkOpen = require('./mkOpen')
const mkPing = require('./mkPing')
const mkPong = require('./mkPong')

const mkBridgehandlers = ({ wsP, redis, connP, fifomeP }) => ({
  event: mkEvent({ wsP, redis, connP, fifomeP }),
  join: mkJoin({ wsP, redis, connP, fifomeP }),
  joinAck: mkJoinAck({ wsP, redis, connP, fifomeP }),
  joinError: mkJoinError({ wsP, redis, connP, fifomeP }),
  leave: mkLeave({ wsP, redis, connP, fifomeP }),
  leaveAck: mkLeaveAck({ wsP, redis, connP, fifomeP }),
  leaveError: mkLeaveError({ wsP, redis, connP, fifomeP }),
  open: mkOpen({ wsP, redis, connP, fifomeP }),
  ping: mkPing({ wsP, redis, connP, fifomeP }),
  pong: mkPong({ wsP, redis, connP, fifomeP })
})

module.exports = mkBridgehandlers
