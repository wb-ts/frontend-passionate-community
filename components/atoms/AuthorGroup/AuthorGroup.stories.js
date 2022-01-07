import React from 'react'
import AuthorGroup from '.'

export default {
  component: AuthorGroup,
  title: 'Components/Atoms/AuthorGroup',
}

const Template = (args) => <AuthorGroup {...args} />

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With Label and Link
export const Label = Template.bind({})
Label.args = {
  label: 'AuthorGroup Label',
}
Label.storyName = 'With Label'

// With Label and Link
export const Link = Template.bind({})
Link.args = {
  label: 'AuthorGroup Label',
  link: 'https://ascd.org',
}
Link.storyName = 'With Label and Link'

// With Authors object
const tmpImage =
  'https://images.ctfassets.net/cguvp07qpj80/4tqoFIEEzf5YNAOxwyRyXn/1b32276ef18ca1909e2e088ee7ea8627/Ananonymousteacher.jpg'
export const Authors = Template.bind({})
Authors.args = {
  label: 'AuthorGroup Label',
  link: 'https://ascd.org',
  authors: [
    {
      fields: {
        thumbnail: {
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
          },
        },
      },
    },
    {
      fields: {
        thumbnail: {
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
          },
        },
      },
    },
    {
      fields: {
        thumbnail: {
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
          },
        },
      },
    },
  ],
}
Authors.storyName = 'With Authors object'
