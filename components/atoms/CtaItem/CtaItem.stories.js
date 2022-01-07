import React from 'react'
import CtaItem from '.'

export default {
  component: CtaItem,
  title: 'Components/Atoms/CtaItem',
}

const Template = (args) => <CtaItem {...args} />

const tmpImage =
  'https://images.ctfassets.net/cguvp07qpj80/4tqoFIEEzf5YNAOxwyRyXn/1b32276ef18ca1909e2e088ee7ea8627/Ananonymousteacher.jpg'

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// Icon
export const Icon = Template.bind({})
Icon.args = {
  icon: {
    fields: {
      imageBynder: [
        {
          src: tmpImage,
        },
      ],
      imageContentful: {
        fields: {
          file: {
            url: tmpImage,
          },
        },
      },
      alternate: 'CtaItem Icon Alt Text',
    },
  },
}
Icon.storyName = 'With Icon'

// Tagline & Subtagline
export const Tag = Template.bind({})
Tag.args = {
  icon: {
    fields: {
      imageBynder: [
        {
          src: tmpImage,
        },
      ],
      imageContentful: {
        fields: {
          file: {
            url: tmpImage,
          },
        },
      },
      alternate: 'CtaItem Icon Alt Text',
    },
  },
  tagline: 'CtaItem Tagline',
  subtagline: 'CtaItem Subtagline',
}
Tag.storyName = 'With Tagline & Subtagline'

// URL
export const URL = Template.bind({})
URL.args = {
  icon: {
    fields: {
      imageBynder: [
        {
          src: tmpImage,
        },
      ],
      imageContentful: {
        fields: {
          file: {
            url: tmpImage,
          },
        },
      },
      alternate: 'CtaItem Icon Alt Text',
    },
  },
  tagline: 'CtaItem Tagline',
  subtagline: 'CtaItem Subtagline',
  url: 'https://ascd.org',
}
URL.storyName = 'With URL'
