export function getChat(id) {
  if (!id) return false;

  id = typeof id == 'string' ? id : id._serialized;
  let found = window.Store.Chat.get(id);

  if (!found) {
    if (Store.Wid.validateWid(id)) {
      const ConstructChat = new window.Store.UserConstructor(id, {
        intentionallyUsePrivateConstructor: true
      });
      found = window.Store.Chat.find(ConstructChat) || false;
    }
  }

  return found;
}
