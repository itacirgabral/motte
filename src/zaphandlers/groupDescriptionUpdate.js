/**
 * when the group description is updated
 * on (event: 'group-description-update', listener: (update: {jid: string, description?: string, actor?: string}) => void): this
 */
const groupDescriptionUpdate = update => {
  console.log('event group-description-update')
  console.dir(update)
}

module.exports = groupDescriptionUpdate
