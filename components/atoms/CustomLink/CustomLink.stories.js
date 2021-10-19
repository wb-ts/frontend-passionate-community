import React from 'react'
import CustomLink from '@/components/atoms/CustomLink'

export default {
  component: CustomLink,
  title: 'Components/Atoms/CustomLink',
  argTypes: { clickAction: { action: 'CustomLink clicked' } },
}

const Template = (args) => <CustomLink {...args}>CustomLink Content</CustomLink>

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Label
export const Label = Template.bind({})
Label.args = {
  label: 'CustomLink Label',
}
Label.storyName = 'With Label'

// Href
export const Href = Template.bind({})
Href.args = {
  label: 'CustomLink Label',
  href: '/all',
}
Href.storyName = 'With Href'

// Size
export const Size = Template.bind({})
Size.args = {
  label: 'CustomLink Label',
  href: '/all',
  size: 'large',
}
Size.storyName = 'With Size'

// Scroll and Shallow
export const Scroll = Template.bind({})
Scroll.args = {
  label: 'CustomLink Label',
  href: '/all',
  size: 'large',
  scroll: true,
  shallow: true,
}
Scroll.storyName = 'With Scroll and Shallow'

// Color and ColorHover
export const Color = Template.bind({})
Color.args = {
  label: 'CustomLink Label',
  href: '/all',
  size: 'large',
  scroll: true,
  shallow: true,
  color: 'red',
  colorHover: 'darkred',
}
Color.storyName = 'With Color and ColorHover'
