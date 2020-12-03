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

const mkBridgehandlers = ({ wsP, redis }) => ({
  event: mkEvent({ wsP, redis }),
  join: mkJoin({ wsP, redis }),
  joinAck: mkJoinAck({ wsP, redis }),
  joinError: mkJoinError({ wsP, redis }),
  leave: mkLeave({ wsP, redis }),
  leaveAck: mkLeaveAck({ wsP, redis }),
  leaveError: mkLeaveError({ wsP, redis }),
  open: mkOpen({ wsP, redis }),
  ping: mkPing({ wsP, redis }),
  pong: mkPong({ wsP, redis })
})

module.exports = mkBridgehandlers
