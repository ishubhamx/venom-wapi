export async function getProfilePicFromServer(id) {
  const pinc = await Store.ProfilePicThumb.find(id).then((x) => x.eurl);
  return pinc;
}
