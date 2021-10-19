import React from 'react'
import NoAnnotations from '@/components/atoms/NoAnnotations'

export default {
  component: NoAnnotations,
  title: 'Components/Atoms/NoAnnotations',
}

const Template = (args) => <NoAnnotations {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Message
export const Message = Template.bind({})
Message.args = {
  message: 'NoAnnotations Message Text',
}
Message.storyName = 'With Message'
