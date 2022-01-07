import React from 'react'
import ViewAllCTA from '.'

export default {
  component: ViewAllCTA,
  title: 'Components/atoms/ViewAllCTA',
}

const Template = (args) => <ViewAllCTA {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Href
export const Href = Template.bind({})
Href.args = {
  label: 'View All CTA',
  href: '/all',
}
Href.storyName = 'With Href'

// With sm Prop
export const sm = Template.bind({})
sm.args = {
  label: 'View All CTA',
  href: '/all',
  sm,
}
sm.storyName = 'With sm Prop'

// With lg Prop
export const lg = Template.bind({})
lg.args = {
  label: 'View All CTA',
  href: '/all',
  lg,
}
lg.storyName = 'With lg Prop'
