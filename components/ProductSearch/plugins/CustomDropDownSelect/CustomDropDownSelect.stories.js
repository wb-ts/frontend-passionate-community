import React from 'react'
import { DropDownSelect } from './CustomDropDownSelect'

export default {
  component: DropDownSelect,
  title: 'Components/ProductSearch/Plugins/DropDownSelect',
}

const items = [
  {
    label: 'Classroom Management',
    value: ['Equity', 'Classroom Management'],
    count: 2,
    isRefined: false,
  },
  {
    label: 'Engagement',
    value: ['Equity', 'Engagement'],
    count: 7,
    isRefined: false,
  },
  {
    label: 'Equity',
    value: ['Professional Learning'],
    count: 5,
    isRefined: true,
  },
]
const currentRefinement = ['Equity']

const Template = (args) => <DropDownSelect {...args} />

export const Default = Template.bind({})
Default.args = {
  items: items,
  currentRefinement: currentRefinement,
}
