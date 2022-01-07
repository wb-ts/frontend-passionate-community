import React from 'react'
import TOCNav from '.'

export default {
  component: TOCNav,
  title: 'Components/Atoms/TOCNav',
}

const Template = (args) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div style={{ flexGrow: '1' }}>
      <div style={{ position: 'sticky', top: '30px' }}>
        <TOCNav {...args} />
      </div>
    </div>

    <div style={{ width: '500px', fontSize: '24px' }}>
      <div id='item_1'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lectus proin nibh
        nisl condimentum id venenatis a condimentum. Sem fringilla ut morbi
        tincidunt augue interdum velit. Adipiscing at in tellus integer feugiat.
        Vitae aliquet nec ullamcorper sit amet. Augue lacus viverra vitae
        congue. Eget lorem dolor sed viverra ipsum nunc. Posuere ac ut consequat
        semper. Eget mauris pharetra et ultrices neque ornare aenean euismod.
        Sit amet nulla facilisi morbi tempus iaculis urna. Hac habitasse platea
        dictumst quisque sagittis. Tortor vitae purus faucibus ornare. Neque
        egestas congue quisque egestas. In ornare quam viverra orci sagittis eu
        volutpat odio.
      </div>

      <div id='item_2'>
        Turpis massa tincidunt dui ut ornare lectus sit. Orci sagittis eu
        volutpat odio facilisis. Non consectetur a erat nam at lectus urna duis.
        Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Tempus
        imperdiet nulla malesuada pellentesque elit eget gravida cum sociis.
        Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Sed
        faucibus turpis in eu mi. Urna condimentum mattis pellentesque id nibh.
        Scelerisque felis imperdiet proin fermentum leo. Mattis vulputate enim
        nulla aliquet. Vestibulum mattis ullamcorper velit sed ullamcorper morbi
        tincidunt ornare massa.
      </div>

      <div id='item_3'>
        Magna fringilla urna porttitor rhoncus. Orci sagittis eu volutpat odio
        facilisis mauris sit amet. In dictum non consectetur a. Ut eu sem
        integer vitae. Pellentesque dignissim enim sit amet. Nulla aliquet
        porttitor lacus luctus. Volutpat sed cras ornare arcu dui vivamus arcu.
        Donec enim diam vulputate ut pharetra sit. Viverra nam libero justo
        laoreet sit. A diam maecenas sed enim ut. Ullamcorper dignissim cras
        tincidunt lobortis feugiat vivamus at augue eget. Nunc sed velit
        dignissim sodales ut eu sem integer. Eros donec ac odio tempor orci.
      </div>
    </div>
  </div>
)

// Blank
export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Blank'

// With TOC Items
export const Items = Template.bind({})
Items.args = {
  toc_items: [
    { id: 'item_1', label: 'item 1' },
    { id: 'item_2', label: 'item 2' },
    { id: 'item_3', label: 'item 3' },
  ],
}
Items.storyName = 'With TOC Items'

// With Style Props
export const Style = Template.bind({})
Style.args = {
  toc_items: [
    { id: 'item_1', label: 'item 1' },
    { id: 'item_2', label: 'item 2' },
    { id: 'item_3', label: 'item 3' },
  ],
  activeBorderWidth: 10,
  activeBorderColor: '#da1717',
  backgroundColor: '#f6c3c3',
  borderLeft: true,
  fontSize: 20,
  maxWidth: 300,
}
Style.storyName = 'With Style Props'
