/**
 * when the group settings is updated
 * on (event: 'group-settings-update', listener: (update: {jid: string, restrict?: string, announce?: string, actor?: string}) => void): this
 */
const groupSettingsUpdate = update => {
  console.log('event group-participants-update')
  console.dir(update)
}

module.exports = groupSettingsUpdate
