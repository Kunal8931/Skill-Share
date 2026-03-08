/*
  Option B: server-side YouTube Data API integration (advanced).
  This endpoint is a placeholder showing how you'd use an OAuth2 refresh token
  to fetch private video details from the YouTube Data API. For a working flow:
   - Create OAuth 2.0 Client in Google Cloud Console,
   - Implement OAuth dance to get refresh token for the channel owner,
   - Store refresh token securely (env or DB),
   - Use googleapis library to refresh tokens and call youtube.videos.list

  For simplicity and to prioritize Option A, we include this file as a guide.
*/
export default async function handler(req:any,res:any){
  res.status(501).json({ ok:false, message:'Option B not implemented in demo. See README for instructions.' })
}
