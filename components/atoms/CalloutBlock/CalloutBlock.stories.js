import React from 'react'
import CalloutBlock from '.'

export default {
  component: CalloutBlock,
  title: 'Components/Atoms/CalloutBlock',
}

const Template = (args) => <CalloutBlock {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Sidelabel
export const Sidelabel = Template.bind({})
Sidelabel.args = {
  sidelabel: 'Side Label',
}
Sidelabel.storyName = 'With Sidelabel'

// Title and Body
export const Title_Body = Template.bind({})
Title_Body.args = {
  sidelabel: 'Side Label',
  title: 'Callout Block Title',
  body: ['Callout Block Body Text1', 'Callout Block Body Text1'],
}
Title_Body.storyName = 'With Title and Body'
