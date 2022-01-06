import React from 'react'
import { MyPagination } from './CustomPagination'

export default {
  component: MyPagination,
  title: 'Components/ProductSearch/Plugins/MyPagination',
}

const Template = (args) => <MyPagination {...args} />

export const Default = Template.bind({})
Default.args = {
  currentRefinement: 1,
  nbPages: 3,
}
