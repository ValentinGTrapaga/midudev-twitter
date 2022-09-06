export const mapUserFromFirebaseAuth = (user) => {
  const { _tokenResponse } = user
  const { photoUrl, screenName } = _tokenResponse
  const blog = `https://www.github.com/${screenName}`
  return {
    avatar: photoUrl,
    username: screenName,
    url: blog
  }
}
