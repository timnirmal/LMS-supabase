import siteMetadata from '../data/siteMetadata'
import ListLayout from '../layouts/ListLayout'
import { PageSEO } from '../components/SEO'
import { InferGetStaticPropsType } from 'next'
import Layout from "../components/Layout";
import {getAllPosts} from "../lib/posts/posts";

export const POSTS_PER_PAGE = 5

export const getStaticProps = async () => {
  const posts = getAllPosts();
  console.log(posts);
  //const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      //initialDisplayPosts: allCoreContent(initialDisplayPosts),
      posts: posts,
      pagination,
    },
  }
}

export default function Blog({
  posts,
  //initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
      <Layout useBackdrop={false} usePadding={true}>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={String(posts)}
        //initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </Layout>
  )
}
