import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem 0.4rem 0 0;
  position: relative;
  background-color: var(--gray-light);
`;

export const ChatInput = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;

  ===============================================Draft-js==================================================
    pre {
    overflow: auto;
    background-color: black;
    color: orange;
    font-family: monospace;
    padding: 5px;
    font-weight: 600;
    max-width: 100%;
  }
  .public-DraftEditorPlaceholder-root {
    position: absolute;
    opacity: 0.3;
  }

  .Draftail-ToolbarButton {
    box-shadow: 0 0 0 0 orange inset;
    transition: box-shadow 0.5s ease;
  }

  .Draftail-ToolbarButton--active {
    background-color: transparent;
    border-width: 0 0 0 0;
    border-color: orange;
    box-shadow: 0 -36px 0 0 orange inset;
    color: black;
    border-radius: 0px;
  }

  /* MENTIONS-STYLES*/
  .draftJsMentionPlugin__mention__29BEd,
  .draftJsMentionPlugin__mention__29BEd:visited {
    color: #575f67;
    cursor: pointer;
    display: inline-block;
    background: #e6f3ff;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 2px;
    text-decoration: none;
  }
  .draftJsMentionPlugin__mention__29BEd:hover,
  .draftJsMentionPlugin__mention__29BEd:focus {
    color: #677584;
    background: #edf5fd;
    outline: 0; /* reset for :focus */
  }
  .draftJsMentionPlugin__mention__29BEd:active {
    color: #222;
    background: #455261;
  }
  .draftJsMentionPlugin__mentionSuggestionsEntry__3mSwm {
    padding: 7px 10px 3px 10px;
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
    display: flex;
    justify-content: flex-start;
  }
  .draftJsMentionPlugin__mentionSuggestionsEntry__3mSwm:active {
    background-color: #cce7ff;
  }
  .draftJsMentionPlugin__mentionSuggestionsEntryFocused__3LcTd {
    background-color: #e6f3ff;
  }
  .draftJsMentionPlugin__mentionSuggestionsEntryText__3Jobq {
    display: inline-block;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 368px;
    font-size: 0.9em;
    margin-bottom: 0.2em;
  }
  .draftJsMentionPlugin__mentionSuggestionsEntryAvatar__1xgA9 {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 12px;
  }
  .draftJsMentionPlugin__mentionSuggestions__2DWjA {
    border: 1px solid #eee;
    margin-top: 0.4em;
    position: absolute;
    min-width: 220px;
    max-width: 440px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 4px 30px 0px rgba(220, 220, 220, 1);
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;
    z-index: 2;
    display: -webkit-box;
    display: flex;
    justify-content: flex-start;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    box-sizing: border-box;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  /* EMIJI STYLES */
  .emoji {
    color: transparent;
    background-size: 2em 2em;
    width: 2em;
    height: 2em;
    display: inline-block;
    background-color: #eee;
    border-radius: 6px;
  }
  .draftJsEmojiPlugin__emojiSelect__34S1B {
    display: inline-block;
  }
  .draftJsEmojiPlugin__emojiSelectButton__3sPol,
  .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu {
    margin: 0;
    padding: 0;
    width: 2.5em;
    height: 1.5em;
    box-sizing: border-box;
    line-height: 1.2em;
    font-size: 1.5em;
    color: #888;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 1.5em;
    cursor: pointer;
  }
  .draftJsEmojiPlugin__emojiSelectButton__3sPol:focus,
  .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:focus {
    outline: 0;
  }
  .draftJsEmojiPlugin__emojiSelectButton__3sPol:hover,
  .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:hover {
    background: #f3f3f3;
  }
  .draftJsEmojiPlugin__emojiSelectButton__3sPol:active,
  .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:active {
    background: #e6e6e6;
  }
  .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu {
    background: #ededed;
  }
  .draftJsEmojiPlugin__emojiSelectPopover__1J1s0 {
    margin-top: 10px;
    padding: 0 0.3em;
    position: absolute;
    z-index: 1000;
    box-sizing: content-box;
    background: #fff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 30px 0 gainsboro;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverClosed__3Kxxq {
    display: none;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverTitle__3tpXz {
    margin: 0 0 0.3em;
    padding-left: 1em;
    height: 2.5em;
    line-height: 2.5em;
    font-weight: normal;
    font-size: 1em;
    color: #9e9e9e;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m {
    margin: 0 0 0.3em;
    position: relative;
    z-index: 0;
    width: 21em;
    height: 20em;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverGroup__3zwcE {
    padding: 0 0.5em;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverGroup__3zwcE:first-child
    .draftJsEmojiPlugin__emojiSelectPopoverGroupTitle__2pC51 {
    display: none;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverGroupTitle__2pC51 {
    margin: 1em 0;
    padding-left: 0.5em;
    font-weight: normal;
    font-size: 1em;
    color: #9e9e9e;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverGroupList__HQ8_y {
    margin: 0;
    padding: 0;
    display: -webkit-box;
    display: flex;
    list-style: none;
    flex-wrap: wrap;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverGroupItem__2pFOS {
    width: 2.5em;
    height: 2.5em;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverToneSelect__28bny {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverToneSelectList__haFSJ {
    margin: 0.3em;
    padding: 0.3em;
    position: absolute;
    display: -webkit-box;
    display: flex;
    list-style: none;
    border: 1px solid #e0e0e0;
    border-radius: 0.5em;
    background: #fff;
    box-shadow: 0 0 0.3em rgba(0, 0, 0, 0.1);
  }
  .draftJsEmojiPlugin__emojiSelectPopoverToneSelectItem__2SgvL {
    width: 2.5em;
    height: 2.5em;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverToneSelectItem__2SgvL:first-child {
    border-right: 1px solid #e0e0e0;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverEntry__1ErDJ,
  .draftJsEmojiPlugin__emojiSelectPopoverEntryFocused__M28XS {
    padding: 0;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  }
  .draftJsEmojiPlugin__emojiSelectPopoverEntryFocused__M28XS {
    background-color: #efefef;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverEntryIcon__1yNaC {
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverNav__1Nzd7 {
    margin: 0;
    padding: 0 0.5em;
    display: -webkit-box;
    display: flex;
    width: 20em;
    list-style: none;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverNavItem__qydCX {
    width: 2.5em;
    height: 2.5em;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverNavEntry__1OiGB,
  .draftJsEmojiPlugin__emojiSelectPopoverNavEntryActive__2j-Vk {
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 1.2em;
    color: #bdbdbd;
    background: none;
    border: none;
    outline: none;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverNavEntryActive__2j-Vk {
    color: #42a5f5;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6 {
    position: absolute;
    right: 0;
    top: 0.3em;
    bottom: 0.3em;
    width: 0.25em;
    background-color: #e0e0e0;
    border-radius: 0.125em;
    opacity: 0.1;
    transition: opacity 0.4s;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverScrollbarThumb__jGYdG {
    background-color: #000;
    border-radius: 0.125em;
    cursor: pointer;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m:hover
    .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6 {
    opacity: 0.3;
  }
  .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m
    .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6:hover,
  .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m
    .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6:active {
    opacity: 0.6;
  }
  .draftJsEmojiPlugin__emoji__2oqBk {
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    display: inline-block;
    overflow: hidden;
    max-width: 1.95ch;
    max-height: 1em;
    line-height: inherit;
    margin: -0.2ex 0em 0.2ex;
    color: transparent;
    min-width: 1em;
  }
  .draftJsEmojiPlugin__emojiSuggestionsEntry__2-2p_ {
    padding: 5px 10px 1px 10px;
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  }
  .draftJsEmojiPlugin__emojiSuggestionsEntry__2-2p_:active {
    background-color: #cce7ff;
  }
  .draftJsEmojiPlugin__emojiSuggestionsEntryFocused__XDntY {
    background-color: #e6f3ff;
  }
  .draftJsEmojiPlugin__emojiSuggestionsEntryText__2sPjk {
    display: inline-block;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 368px;
    font-size: 0.9em;
  }
  .draftJsEmojiPlugin__emojiSuggestionsEntryIcon__1qC2V {
    width: 1em;
    height: 1em;
    margin-left: 0.25em;
    margin-right: 0.25em;
    display: inline-block;
  }
  .draftJsEmojiPlugin__emojiSuggestions__2ffcV {
    border: 1px solid #eee;
    margin-top: 1.75em;
    position: absolute;
    min-width: 220px;
    max-width: 440px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 4px 30px 0px rgba(220, 220, 220, 1);
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;
    z-index: 2;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    box-sizing: border-box;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  /* STICKER-PLUGIN-STYLES */
  .draftJsStickerPlugin__selectSticker__3VCSX {
    border: 0;
    border-radius: 4px;
    background: #fff;
    margin: 5px 0px 5px 0px;
    box-sizing: border-box;
  }
  .draftJsStickerPlugin__selectSticker__3VCSX:hover,
  .draftJsStickerPlugin__root__32LE-:focus {
    background: #efefef;
    outline: 0; /* reset for :focus */
  }
  .draftJsStickerPlugin__selectSticker__3VCSX:active {
    background: #dfdfdf;
  }
  .draftJsStickerPlugin__selectStickerImage__HoOE2 {
    height: 80px;
    width: 80px;
    -webkit-user-drag: none;
    user-drag: none;
  }
  .draftJsStickerPlugin__select__30KbO {
    background: #fff;
    display: inline-block;
  }
  .draftJsStickerPlugin__selectPopover__20IIM {
    margin-top: 10px;
    background: #fff;
    position: absolute;
    height: 250px;
    width: 230px;
    border-radius: 2px;
    padding: 10px;
    box-shadow: 0px 4px 30px 0px rgba(220, 220, 220, 1);
    z-index: 1000;
  }
  .draftJsStickerPlugin__selectClosedPopover__1UXVa {
    display: none;
  }
  .draftJsStickerPlugin__selectButton__3voOt {
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #ddd;
    padding: 0;
    color: #888;
    margin: 0;
    border-radius: 1.5em;
    cursor: pointer;
    height: 1.5em;
    width: 2.5em;
    font-size: 1.5em;
    line-height: 1.2em;
    margin: 0;
  }
  .draftJsStickerPlugin__selectButton__3voOt:focus {
    outline: 0; /* reset for :focus */
  }
  .draftJsStickerPlugin__selectButton__3voOt:hover {
    background: #f3f3f3;
  }
  .draftJsStickerPlugin__selectButton__3voOt:active {
    background: #e6e6e6;
  }
  .draftJsStickerPlugin__selectPressedButton__1xYeW {
    background: #ededed;
  }
  .draftJsStickerPlugin__selectBottomGradient__1DA_0 {
    width: 100%;
    height: 1em;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: white;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  .draftJsStickerPlugin__selectStickerList__3F4Za {
    position: absolute;
    overflow-x: none;
    overflow-y: scroll;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-flow: row wrap;
    align-content: flex-start;
  }
  .draftJsStickerPlugin__sticker__2_vBJ {
    margin: 0;
    position: relative;
    display: block;
  }
  .draftJsStickerPlugin__stickerRemoveButton__2vzbk {
    background: #d9d9d9;
    color: #fff;
    margin: 0;
    padding: 0.5em;
    border: none;
    border-radius: 50%;
    line-height: 80%;
    position: absolute;
    font-size: 0.62em;
    margin-left: -0.825em;
    cursor: pointer;
  }
  .draftJsStickerPlugin__stickerRemoveButton__2vzbk:hover {
    background: #e4e4e4;
  }
  .draftJsStickerPlugin__stickerRemoveButton__2vzbk:active {
    background: #cecece;
    color: #efefef;
  }
  .draftJsStickerPlugin__stickerImage__2X3Cm {
    width: 80px;
    height: 80px;
  }
  .editor {
    box-sizing: border-box;
    border: 1px solid #ddd;
    cursor: text;
    padding: 16px;
    border-radius: 2px;
    margin-bottom: 2em;
    box-shadow: inset 0px 1px 8px -3px #ababab;
    background: #fefefe;
  }

  .editor :global(.public-DraftEditor-content) {
    min-height: 140px;
  }

  .options {
    margin-bottom: 20px;
  }

  .DraftEditor-root {
    padding: 1rem;
    flex: 1;
    max-height: 5rem;
    overflow: auto;
    width: unset !important;
    margin-right: 5rem;
    cursor: auto;
    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .DraftEditor-root a {
    color: blue;
  }

  /* MENTION */
  .mention {
    color: red;
    text-decoration: none;
  }

  .mentionSuggestions {
    border-top: 1px solid #eee;
    background: black;
    border-radius: 2px;
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    transform-origin: 50% 0%;
    transform: scaleY(0);
    margin: -16px;
  }
`;

export const ChatActions = styled.div`
  background-color: ;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid var(--gray-deep);
`;

export const Label = styled.label`
  display: inline-flex;
  cursor: pointer;
  font-size: 1.6rem;
  margin-right: 0.5rem;
  position: relative;
  & input {
    display: none;
  }
`;

export const EmojiComponent = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  bottom: 100%;
  left: -1rem;
  & button {
    & > span {
      cursor: pointer !important;
    }
    outline: none;
    border: none;
  }
`;

export const SendMessage = styled.button`
  display: inline-block;
  position: absolute;
  border: none;
  outline: none;
  font-size: 1.5rem;
  background-color: transparent;
  cursor: pointer;
  color: #3949ab;
  right: 1rem;
  bottom: 0.2rem;
  &:hover {
    color: #1a237e;
  }
`;
