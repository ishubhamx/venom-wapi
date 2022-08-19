export async function loadAllEarlierMessages(id, done) {
  const found = window.WAPI.getChat(id);
  while (!found.msgs.msgLoadState.noEarlierMsgs) {
    console.log('Loading...');
    await window.Store.ConversationMsgs.loadEarlierMsgs(found);
  }
  console.log('done');
  return true;
}

/**
 * SYNC version
 * Loads all earlier messages of given chat id
 * @param {string} id Chat id
 * @param {Funciton} done Optional callback
 */
export function asyncLoadAllEarlierMessages(id, done) {
  loadAllEarlierMessages(id);
  done();
}
