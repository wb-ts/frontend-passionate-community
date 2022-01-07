import React from 'react'
import TwoColumnHeader from '.'

export default {
  component: TwoColumnHeader,
  title: 'Components/Atoms/TwoColumnHeader',
}

const Template = (args) => <TwoColumnHeader {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Title and Body
export const Title_Body = Template.bind({})
Title_Body.args = {
  title: 'Two Column Header Title',
  body: 'Two Column Header Body Text',
}
Title_Body.storyName = 'With Title and Body'

// With CTA
export const CTA = Template.bind({})
CTA.args = {
  title: 'Two Column Header Title',
  body: 'Two Column Header Body Text',
  ctaLabel: 'Two Column CTA',
  ctaLink: '/all',
}
CTA.storyName = 'With CTA'
