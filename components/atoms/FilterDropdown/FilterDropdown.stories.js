import React from 'react'
import FilterDropdown from '.'

export default {
  component: FilterDropdown,
  title: 'Components/Atoms/FilterDropdown',
  argTypes: { action: { action: 'FilterDropdown Changed' } },
}

const Template = (args) => <FilterDropdown {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Items
export const Items = Template.bind({})
Items.args = {
  items: [
    {
      value: 'item 1',
      label: 'item 1',
    },
    {
      value: 'item 2',
      label: 'item 2',
    },
    'item 3',
    {
      value: 'item 4',
      label: 'item 4',
    },
  ],
}
Items.storyName = 'With Items'

// With Default Selected
export const Selected = Template.bind({})
Selected.args = {
  items: [
    {
      value: 'item 1',
      label: 'item 1',
    },
    {
      value: 'item 2',
      label: 'item 2',
    },
    'item 3',
    {
      value: 'item 4',
      label: 'item 4',
    },
  ],
  defaultValue: 'item 2',
}
Selected.storyName = 'With Default Selected'

// With Style Props
export const Style = Template.bind({})
Style.args = {
  items: [
    {
      value: 'item 1',
      label: 'item 1',
    },
    {
      value: 'item 2',
      label: 'item 2',
    },
    'item 3',
    {
      value: 'item 4',
      label: 'item 4',
    },
  ],
  defaultValue: 'item 2',
  width: 300,
  height: 120,
  marginLeft: 150,
}
Style.storyName = 'With Style Props'
