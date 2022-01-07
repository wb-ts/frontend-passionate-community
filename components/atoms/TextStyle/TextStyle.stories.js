import React from 'react'
import TextStyle from '.'

export default {
  component: TextStyle,
  title: 'Components/atoms/TextStyle',
}

const Template = (args) => <TextStyle {...args}>Text Style Text</TextStyle>

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Color and Variant
export const Color_Variant = Template.bind({})
Color_Variant.args = {
  color: '#123456',
  variant: 'overlineLarge',
}
Color_Variant.storyName = 'With Color and Variant'

// With Component
export const Component = Template.bind({})
Component.args = {
  color: '#123456',
  variant: 'tinyStrikeThrough',
  component: 'h2',
}
Component.storyName = 'With Component'
