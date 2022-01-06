import React from 'react'
import { ClearRefinements } from './CustomClearRefinements'

export default {
  component: ClearRefinements,
  title: 'Components/ProductSearch/Plugins/ClearRefinements',
}

const Template = (args) => <ClearRefinements {...args} />

export const Default = Template.bind({})
Default.args = {
  items: [{ attribute: 'filter', index: 'workshop_stage' }],
  keepFilters: ['filter'],
}
