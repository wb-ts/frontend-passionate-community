import React from 'react'
import { ClearFilters } from './CustomClearFilters'

export default {
  component: ClearFilters,
  title: 'Components/ProductSearch/Plugins/ClearFilters',
}

const Template = (args) => <ClearFilters {...args} />

export const Default = Template.bind({})
Default.args = {
  items: [{ attribute: 'filter', index: 'workshop_stage' }],
  keepFilters: ['filter'],
}
