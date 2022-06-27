import Link from 'next/link';
import React from 'react'

export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
  
    return {
      props: { posts: data }
    }
  }


export default function posts({ posts }) {
    return (
        <>
            <div>All posts</div>
            {
                posts.map(
                    post => (
                        <Link href={`/posts/${post.id}`} key={post.id}>
                            <h3>
                                {post.title}
                            </h3>
                        </Link>
                    )
                )
            }
        </>
    )
}
