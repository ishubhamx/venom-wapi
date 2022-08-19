export async function getHost() {
  const fromwWid = await Store.MaybeMeUser.getMaybeMeUser();
  const idUser = await WAPI.sendExist(fromwWid._serialized);
  const infoUser = await Store.MyStatus.getStatus(idUser);
  return await WAPI._serializeMeObj(infoUser);
}
