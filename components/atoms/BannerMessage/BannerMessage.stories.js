import React from 'react'
import BannerMessage from '.'

export default {
  component: BannerMessage,
  title: 'Components/Atoms/BannerMessage',
}

const Template = (args) => (
  <BannerMessage {...args}>BannerMessage Text</BannerMessage>
)

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Variant: Special
export const Special = Template.bind({})
Special.args = {
  variant: 'special',
}
Special.storyName = 'With Variant'
