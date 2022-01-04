import React from 'react'
import TwoColumn from './TwoColumn'

export default {
  component: TwoColumn,
  title: 'Layouts/TwoColumn',
}

const Template = (args) => <TwoColumn {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {
  left: <div>Left Side Content</div>,
  right: <div>Right Side Content</div>,
}
Default.storyName = 'Basic Example'
