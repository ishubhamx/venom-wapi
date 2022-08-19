export function loadEarlierMessagesTillDate(id, lastMessage, done) {
  const found = WAPI.getChat(id);
  const x = function () {
    if (
      found.msgs._models[0].t > lastMessage &&
      !found.msgs.msgLoadState.noEarlierMsgs
    ) {
      window.Store.ConversationMsgs.loadEarlierMsgs(found).then(x);
    } else {
      done();
    }
  };
  x();
}
