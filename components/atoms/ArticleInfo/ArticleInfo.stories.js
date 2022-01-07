import React from 'react'
import ArticleInfo from '.'

export default {
  component: ArticleInfo,
  title: 'Components/Atoms/ArticleInfo',
}

const Template = (args) => <ArticleInfo {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Title and AuthorName
export const Title_Author = Template.bind({})
Title_Author.args = {
  title: 'Article Info Title',
  authorName: 'Article Info Author',
}
Title_Author.storyName = 'With Title & AuthorName'

// With Published Date
export const Published = Template.bind({})
Published.args = {
  title: 'Article Info Title',
  authorName: 'Article Info Author',
  datePublished: '2021-10-8',
}
Published.storyName = 'With Published Date'

// With Topic Tag
export const Topic = Template.bind({})
Topic.args = {
  title: 'Article Info Title',
  authorName: 'Article Info Author',
  datePublished: '2021-10-8',
  topicTag: 'topic tag',
}
Topic.storyName = 'With Topic'

// With Preminum Badge
export const Preminum = Template.bind({})
Preminum.args = {
  title: 'Article Info Title',
  authorName: 'Article Info Author',
  datePublished: '2021-10-8',
  topicTag: 'topic tag',
  premium: true,
}
Preminum.storyName = 'With Preminum Badge'
