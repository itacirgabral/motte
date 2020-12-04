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

const mkBridgehandlers = ({ wsP, redis, connP }) => ({
  event: mkEvent({ wsP, redis, connP }),
  join: mkJoin({ wsP, redis, connP }),
  joinAck: mkJoinAck({ wsP, redis, connP }),
  joinError: mkJoinError({ wsP, redis, connP }),
  leave: mkLeave({ wsP, redis, connP }),
  leaveAck: mkLeaveAck({ wsP, redis, connP }),
  leaveError: mkLeaveError({ wsP, redis, connP }),
  open: mkOpen({ wsP, redis, connP }),
  ping: mkPing({ wsP, redis, connP }),
  pong: mkPong({ wsP, redis, connP })
})

module.exports = mkBridgehandlers
