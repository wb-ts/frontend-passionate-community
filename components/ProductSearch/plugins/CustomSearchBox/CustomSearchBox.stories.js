import React from 'react'
import { SearchBox } from './CustomSearchBox'

export default {
  component: SearchBox,
  title: 'Components/ProductSearch/Plugins/SearchBox',
}

const Template = (args) => <SearchBox {...args} />

export const Default = Template.bind({})
Default.args = {
  currentRefinement: 'currentRefinement',
}
