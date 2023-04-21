import { getAllPostIds, getPostData } from '@/lib/post'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import homestyles from '../../styles/Home.module.css';
export default function post({ postData }: {
  postData: {
    title: string,
    date: string,
    contentHtml: string
  }
}) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homestyles.headingXl}>{postData.title}</h1>
        <div className={homestyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  console.log('paths', paths);
  return {
    // [paths:
    //   { params: { id: 'pre-rendering' } },
    //   { params: { id: 'ssg-ssr' } }
    // ],
    // fallback:
    paths,
    fallback: false
    //fallback이 false면 getStaticPaths로 리턴되지 않는 것은 모두 404페이지가 뜬다
    //true면 404로 뜨지않고, fallback 페이지가 뜨게 된다
  }



}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('params->', params)
  const postData = await getPostData(params?.id as string)
  return {
    props: {
      postData
    }
  }
}
