import { Link, useParams } from 'react-router-dom'
import blogPosts from '../content/blog/posts'

const BlogPostPage = () => {
  const { slug } = useParams()
  const post = blogPosts.find((entry) => entry.slug === slug)

  if (!post) {
    return (
      <div className="mw6 center lh-copy">
        <p className="f4 mb2 near-black fw6">Post not found</p>
        <p className="f5 mb3">
          That post doesn&apos;t exist yet.
        </p>
        <Link to="/" className="link blue hover-dark-blue f5">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="mw6 center lh-copy">
      <p className="f4 mb2 near-black fw6">{post.title}</p>
      <p className="f5 mb3">
        This is a placeholder post page. Add your content here when you&apos;re ready.
      </p>
      <p className="f6 mb3 near-black">
        Media lives in{' '}
        <a href={post.assetsPath} className="link blue hover-dark-blue">
          {post.assetsPath}
        </a>
        .
      </p>
      <Link to="/" className="link blue hover-dark-blue f5">
        Back to home
      </Link>
    </div>
  )
}

export default BlogPostPage
