import React, { useMemo } from 'react';
import createMentionPlugin from '@draft-js-plugins/mention';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createHashTagPlugin from '@draft-js-plugins/hashtag';
import { HashtagLink, LinkAnchor } from './styles/useDraftEditorPlugin.styles';
const useDraftEditorPlugin = () => {
  // useMemo plugins
  const { plugins, MentionSuggestions, EmojiSelect, EmojiSuggestions } =
    useMemo(() => {
      // Emoji
      const emojiPlugin = createEmojiPlugin({
        selectButtonContent: '😀',
      });
      const { EmojiSelect, EmojiSuggestions } = emojiPlugin;
      // Linkify
      const linkifyPlugin = createLinkifyPlugin({
        target: '_blank',
        rel: 'noopener noreferrer',
        component(props) {
          return <LinkAnchor {...props} aria-label="link" />;
        },
      });
      // Mention
      const mentionPlugin = createMentionPlugin({
        mentionComponent(mentionProps) {
          return (
            <a
              className={mentionProps.className}
              href={`${window.location.href}${mentionProps.mention.slug}`}
              aria-label="mention"
            >
              {mentionProps.children}
            </a>
          );
        },
      });
      const hashTagPlugin = createHashTagPlugin({
        hashtagComponent(props) {
          return (
            <HashtagLink
              href={`${
                window.location.href
              }hashtag?q=${props.decoratedText.replace(/#/g, '')}`}
              aria-label="hashtag"
            >
              {props.children}
            </HashtagLink>
          );
        },
      });
      const { MentionSuggestions } = mentionPlugin;
      // hashTag

      const plugins = [
        mentionPlugin,
        hashTagPlugin,
        emojiPlugin,
        linkifyPlugin,
      ];

      return { plugins, EmojiSelect, EmojiSuggestions, MentionSuggestions };
    }, []);

  return { plugins, MentionSuggestions, EmojiSelect, EmojiSuggestions };
};

export default useDraftEditorPlugin;
