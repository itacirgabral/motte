/**
 *  when the connection is opening
 * on (event: 'connecting', listener: () => void): this
 */

const connecting = ({ pubsub }) => () => {
  console.log('event connecting')
}

module.exports = connecting
