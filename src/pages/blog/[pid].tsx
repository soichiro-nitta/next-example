import React from 'react'
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default Post

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async () => {
  return {}
}

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticPaths = async () => {
  // Return our list of blog posts to prerender
  return ['/blog/1', '/blog/2']
}
