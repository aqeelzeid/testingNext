import React from 'react'

export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
  
    console.log(data)

    // map data to an array of path objects with params (id)
    const paths = data.map(  post => {
      return {
        params: { id: post.id.toString() }
      }
    })

    return {
      paths,
      fallback: false
    }
  }

  export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
    const data = await res.json();
  
    //Get Comments 
    const res2 = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    const data2 = await res2.json();
    

    return {
      props: { post: data , comments : data2  }
    }
  }


export default function Post({post, comments}) {
  
    return (
    <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <hr/>
        <h1>Comments</h1>
        {
            comments.map( 
                com => (
                    <div key = {com.id}>
                        <h4>by {com.email}</h4>
                        <p>{com.body}</p>
                    </div>
                )
            )
        }
    </div>
  )
}
