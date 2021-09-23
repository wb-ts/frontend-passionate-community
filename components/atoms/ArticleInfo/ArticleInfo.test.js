/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from 'test-utils'

import ArticleInfo from '@/components/atoms/ArticleInfo'

describe('ArticleInfo component:', () => {
  test('Instructional Strategies Article rendered successfully', () => {
    render(
      <ArticleInfo
        premium={true}
        topicTag="Instructional Strategies"
        topicTagColor='black'
        title="Putting the Person Back in Personalized Learning"
        authorName='Paul Emerich'
        datePublished='2021-09-01'
        expand={false}
        authorSpace={false} />     
    )
    
    expect(screen.getByText('Instructional Strategies')).toBeInTheDocument()
    expect(screen.getByText("Putting the Person Back in Personalized Learning")).toBeInTheDocument()
    
  })
})