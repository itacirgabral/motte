const seals = require('../seals')

/**
 * when the group settings is updated
 * on (event: 'group-settings-update', listener: (update: {jid: string, restrict?: string, announce?: string, actor?: string}) => void): this
 */
const groupSettingsUpdate = ({ pubsub }) => update => {
  console.log('event group-participants-update')
  console.dir(update)

  pubsub.publish(seals.groupSettingsUpdate, { groupSettingsUpdate: JSON.stringify(update) })
}

module.exports = groupSettingsUpdate
