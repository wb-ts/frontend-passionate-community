import React from 'react'
import { DateRangeInput } from './CustomDateRangePicker'

export default {
  component: DateRangeInput,
  title: 'Components/ProductSearch/Plugins/DateRangeInput',
}

const Template = (args) => <DateRangeInput {...args} />

export const Default = Template.bind({})
Default.args = {
  currentRefinement: {
    min: new Date('11/10/2020').getTime() / 1000,
    max: new Date('12/12/2021').getTime() / 1000,
  },
}
