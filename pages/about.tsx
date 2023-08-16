import Container from 'components/BlogContainer';
import BlogHeader from 'components/BlogHeader';
import { readToken } from 'lib/sanity.api';
import { getAboutUs, getClient } from 'lib/sanity.client';
import { GetStaticProps } from 'next';
import React from 'react';

const AboutUs: React.FC = (props) => {
  const aboutData = props?.data[0]
  return (
    <>
    <Container>
      <BlogHeader title={'Blog.'}  level={2} />
      <div className="container mx-auto px-4 py-8">
        
        <p className="text-gray-700 mb-6">
        {aboutData.title}
        </p>
        <p className="text-gray-600">
        {aboutData.description}
        </p>
      </div>
    </Container>
    </>
  );
}

export default AboutUs;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const data = await Promise.all([
    getAboutUs(client)
  ])

  return {
    props: {
      data,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
