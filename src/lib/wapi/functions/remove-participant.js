export async function removeParticipant(groupId, contactsId) {
  const chat = window.Store.WidFactory.createWid(groupId);

  if (!Array.isArray(contactsId)) {
    contactsId = [contactsId];
  }

  contactsId = await Promise.all(
    contactsId.map((c) => window.Store.WidFactory.createWid(c))
  );

  if (!contactsId.length) {
    return false;
  }

  const participants = contactsId.map((p) =>
    window.Store.WidFactory.createWid(p)
  );

  return window.Store.sendRemoveParticipants(chat, participants);
}
