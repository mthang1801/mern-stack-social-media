import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import createEmojiPlugin from '@draft-js-plugins/emoji';
const emojiPlugin = createEmojiPlugin();
const { EmojiSelect, EmojiSuggestions } = emojiPlugin;
const linkifyPlugin = createLinkifyPlugin({
  component(props) {
    return <a {...props} onClick={() => alert('Clicked on Link!')} />;
  },
});
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [linkifyPlugin, mentionPlugin, emojiPlugin];

const Linkify = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [suggestions, setSuggestions] = useState(mentions);
  const [open, setOpen] = useState(true);

  const onOpenChange = React.useCallback((_open) => setOpen(_open), []);
  const onSearchChange = React.useCallback(({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);
  return (
    <div className="wrapper">
      <h2 style={{ color: '#43a047' }}>Draftjs Linkify</h2>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
      />
      <MentionSuggestions
        open={open}
        suggestions={suggestions}
        onOpenChange={onOpenChange}
        onSearchChange={onSearchChange}
      />
      <EmojiSuggestions />
      <EmojiSelect />
    </div>
  );
};

const mentions = [
  {
    id: 1,
    name: 'Matthewwqeeqs Russell',
    email: 'matthew.russell@google.com',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    id: 1230,
    name: 'Juliasadaw Krispel-Samsel',
    email: 'julian.krispel@google.com',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  {
    id: 66,
    name: 'Jyotiewq Puri',
    email: 'jyoti@yahoo.com',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
  },
  {
    id: 905,
    name: 'Maxcxzc Stoiber',
    email: 'max.stoiber@university.edu',
    avatar:
      'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
  },
  {
    id: 54111,
    name: 'Nikeq Graf',
    email: 'info@nik-graf.com',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    id: 22,
    name: 'Pascalewq Brandt',
    email: 'pascalbrandt@fastmail.com',
    avatar:
      'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
  {
    id: 3216361,
    name: 'Matthewewqeq Russell',
    email: 'matthew.russell@google.com',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    id: 192365,
    name: 'Julianewqeq Krispel-Samsel',
    email: 'julian.krispel@google.com',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  {
    id: 23648,
    name: 'Jyotiewqeqw Puri',
    email: 'jyoti@yahoo.com',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
  },
  {
    id: 36812,
    name: 'Maxewqeq Stoiber',
    email: 'max.stoiber@university.edu',
    avatar:
      'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
  },
  {
    id: 789327,
    name: 'Nikewqewqad Graf',
    email: 'info@nik-graf.com',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    id: 32131,
    name: 'Pascalsadwq Brandt',
    email: 'pascalbrandt@fastmail.com',
    avatar:
      'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
  {
    id: 121312,
    name: 'Matthewewqe Russell',
    email: 'matthew.russell@google.com',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    id: 125134,
    name: 'Julianewq Krispel-Samsel',
    email: 'julian.krispel@google.com',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  {
    id: 3213214,
    name: 'Jyotiasd Puri',
    email: 'jyoti@yahoo.com',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
  },
  {
    id: 65361,
    name: 'Maxewq Stoiber',
    email: 'max.stoiber@university.edu',
    avatar:
      'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
  },
  {
    id: 5321,
    name: 'Nikewq Graf',
    email: 'info@nik-graf.com',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    id: 43,
    name: 'Pascalewq Brandt',
    email: 'pascalbrandt@fastmail.com',
    avatar:
      'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
];

export default Linkify;
