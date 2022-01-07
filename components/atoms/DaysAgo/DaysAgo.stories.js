import React from 'react'
import DaysAgo from '.'

export default {
  component: DaysAgo,
  title: 'Components/atoms/DaysAgo',
}

const Template = (args) => <DaysAgo {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Invalid Input
export const Invalid = Template.bind({})
Invalid.args = {
  input: 'ASCD',
}
Invalid.storyName = 'With Invalid Input'

// With Valid Input
export const Valid = Template.bind({})
Valid.args = {
  input: '2021-10-08',
}
Valid.storyName = 'With Valid Input'

// Widh Variant
export const Variant = Template.bind({})
Variant.args = {
  input: '2021-10-08',
  variant: 'strikeThrough',
}
Variant.storyName = 'With Variant'
