import React from 'react'

import UserAccountToolbarMenu from './UserAccountToolbarMenu'

export default {
  component: UserAccountToolbarMenu,
  title: 'User Account Toolbar Menu',
}

const Template = (args) => <UserAccountToolbarMenu {...args} />

export const Default = Template.bind({})
export const LoggedIn = Template.bind({})
