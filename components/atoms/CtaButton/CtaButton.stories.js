import React from 'react'
import CtaButton from '.'

export default {
  component: CtaButton,
  title: 'Components/atoms/CtaButton',
}

const Template = (args) => <CtaButton {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Label
export const Label = Template.bind({})
Label.args = {
  label: 'CtaButton Label',
}
Label.storyName = 'With Label Only'

// Click Action
export const Click = Template.bind({})
Click.args = {
  label: 'CtaButton Label',
  onclick: () => alert('CtaButton clicked!'),
}
Click.storyName = 'With onClick'

// Href
export const Href = Template.bind({})
Href.args = {
  label: 'CtaButton Label',
  href: '/all',
}
Href.storyName = 'With href'

// Click and Href
export const Click_Href = Template.bind({})
Click_Href.args = {
  label: 'CtaButton Label',
  onclick: () => alert('CtaButton clicked!'),
  href: '/all',
}
Click_Href.storyName = 'With onClick and href'

// Underlined
export const Underlined = Template.bind({})
Underlined.args = {
  label: 'CtaButton Label',
  href: '/all',
  underlined: true,
}
Underlined.storyName = 'Underlined'

// Full Width
export const Full = Template.bind({})
Full.args = {
  label: 'CtaButton Label',
  href: '/all',
  fullWidth: true,
}
Full.storyName = 'Full Width'

// All Props
export const All = Template.bind({})
All.args = {
  label: 'CtaButton Label',
  onclick: () => alert('CtaButton clicked!'),
  href: '/all',
  underlined: true,
  fullWidth: true,
  variant: 'contained',
  color: 'primary',
  size: 'large',
  target: '#',
  id: 'cta_1',
  styles: { marginTop: '100px', maxWidth: '800px' },
}
All.storyName = 'All Props'
