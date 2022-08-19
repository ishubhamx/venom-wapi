export async function loadAndGetAllMessagesInChat(
  id,
  includeMe,
  includeNotifications
) {
  return window.WAPI.loadAllEarlierMessages(id).then(() => {
    const chat = window.WAPI.getChat(id);
    let output = [];
    const messages = chat.msgs._models;

    for (const i in messages) {
      if (i === 'remove') {
        continue;
      }
      const messageObj = messages[i];

      let message = WAPI.processMessageObj(
        messageObj,
        includeMe,
        includeNotifications
      );
      if (message) output.push(message);
    }
    return output;
  });
}

/**
 * SYNC version
 * Loads all earlier messages of given chat id
 * @param {string} id Chat id
 * @param {Funciton} done Optional callback
 */
export function asyncLoadAllEarlierMessages(id, done) {
  loadAndGetAllMessagesInChat(id);
  done();
}
