import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --maxWidth-none: "none";
  --maxWidth-xs: 20rem;
  --maxWidth-sm: 24rem;
  --maxWidth-md: 28rem;
  --maxWidth-lg: 32rem;
  --maxWidth-xl: 36rem;
  --maxWidth-2xl: 42rem;
  --maxWidth-3xl: 48rem;
  --maxWidth-4xl: 56rem;
  --maxWidth-full: "100%";
  --maxWidth-wrapper: var(--maxWidth-2xl);
  --spacing-px: "1px";
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-32: 8rem;    
  --fontWeight-normal: 400;
  --fontWeight-medium: 500;
  --fontWeight-semibold: 600;
  --fontWeight-bold: 700;
  --fontWeight-extrabold: 800;
  --fontWeight-black: 900;
  --fontSize-root: 16px;
  --lineHeight-none: 1;
  --lineHeight-tight: 1.1;
  --lineHeight-normal: 1.5;
  --lineHeight-relaxed: 1.625;
  /* 1.200 Minor Third Type Scale */
  --fontSize-0: 0.833rem;
  --fontSize-1: 1rem;
  --fontSize-2: 1.2rem;
  --fontSize-3: 1.44rem;
  --fontSize-4: 1.728rem;
  --fontSize-5: 2.074rem;
  --fontSize-6: 2.488rem;
  --fontSize-7: 2.986rem;
  --color-primary: #005b99;
  
  --color-heading: #1a202c;
  --color-heading-black: black;
  --color-accent: #d1dce5;
  --abyss : #07223d;

  --gray-dark : #454545;
  --gray-light: #dedede;
  --gray-deep : #bfbfbf;

  --mainTransition: 0.15s all;
  --secondTransition : 0.6s all;
  --transition-delay : 0.5s;
  --blue: #0d6efd;
  --dark-blue: #003e9a;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #d63384;
  --red: #dc3545;
  --orange: #fd7e14;
  --yellow: #ffc107;
  --green: #198754;  
  --teal: #20c997;
  --cyan: #0dcaf0;
  --white: #fff;
  --gray: #6c757d;
  --gray-dark: #343a40;
  --primary: #0d6efd;
  --secondary: #6c757d;
  --success: #198754;
  --info: #0dcaf0;
  --warning: #ffc107;
  --danger: #dc3545;
  --light: #f8f9fa;
  --dark: #212529;  
  --blue-1 :#1e88e5 ;
  --blue-2 : #1976d2 ;
  --blue-3 : #0d47a1;

  --color-background-default: #f0f0f0;
  --color-background-default-secondary : #b4b4b4;
  --color-text-default : #000;  

  --color-background-dark : #2c2c2c;
  --color-background-dark-secondary : #0e0d0d; 
  --color-text-dark : #fff;
  --color-hover-dark : var(--gray-dark);

  --color-card-dark : #2d2f31;    
  --color-card-default : #fff;
  --color-hover-default : var(--light);
  
  --color-border-dark : #0e0f10; 
  --color-border-default : #e8e8e8;

  --fontFamily-sans: Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --fontFamily-serif: "Merriweather", "Georgia", Cambria, "Times New Roman",
    Times, serif;
  --fontFamily: system-ui,-apple-system,BlinkMacSystemFont,Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  --gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));  
  --lightShadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
  --mediumShadow : 2px 3px 3px 1px rgba(0,0,0,0.2);
  --darkShadow: 4px 10px 5px 1px rgba(0, 0, 0, 0.3);    
  font-size : ${({ rootFont }) => (rootFont ? `${rootFont}px` : "16px")}  
}
  *,:after, :before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html{
    line-height: var(--lineHeight-normal);
    font-size: var(--fontSize-root);    
    -webkit-text-size-adjust: 100%; /* 2 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    font-family: var(--fontFamily);            
    font-weight: 400 !important;
    font-size: var(--fontSize-1);    
    width : 100vw;
    overflow-x : hidden;
  }

  input{
    font-family: 'Roboto','Noto',sans-serif;
  }

  h1{
    margin-bottom : 2rem;
  }
  h2{
    margin : 1.6rem 0;
  }
  h3{
    font-weight: 600;      
    margin-bottom : 1.25rem;    
  }

  h1 {   
    font-size: var(--fontSize-6);    
  }
  
  h2 {
    font-size: var(--fontSize-5);
  }
 
  h3 {
    font-size: var(--fontSize-4);
  }
  
  h4{
    font-size: var(--fontSize-3);
  }
  
  h5 {
    font-size: var(--fontSize-2);
  }  
  h6 {
    font-size: var(--fontSize-1);
  }
  h1 > a,
  h2 > a,
  h3 > a,
  h4 > a,
  h5 > a,
  h6 > a {
    text-decoration: none;    
  }
  p{
    line-height: var(--lineHeight-relaxed);
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    margin: var(--spacing-0) var(--spacing-0) var(--spacing-1) var(--spacing-0);
    padding: var(--spacing-0);
  }

  span:focus,
  div:focus,
  p:focus{
    outline : none !important;
  }

  ul,
  ol {   
    margin-right: var(--spacing-0);
    padding: var(--spacing-0);
    margin-bottom: var(--spacing-8);
    list-style-position: outside;
    list-style-image: none;
  }
  ul li,
  ol li {
    padding-left: var(--spacing-0);    
  }
  
  li *:last-child {
    margin-bottom: var(--spacing-0);
  }
  
  li > ul {
    margin-left: var(--spacing-8);
    margin-top: calc(var(--spacing-8) / 2);
  }

  blockquote {
    border-left: 3px solid var(--success);
    font-family: Georgia, Times, "Times New Roman", serif;   
    font-style: italic;
    line-height: 1.6em;        
    margin-left: calc(-1 * var(--spacing-6));
    margin-right: var(--spacing-8);
    padding: var(--spacing-4) var(--spacing-0) var(--spacing-4) var(--spacing-6);   
    font-size: var(--fontSize-2);    
    margin-bottom: var(--spacing-8);
    z-index: 0 ;    
  }
  blockquote code{
    font-size : 1em;
  }
  
  blockquote > :last-child {
    margin-bottom: var(--spacing-0);
  }
  
  blockquote > ul,
  blockquote > ol {
    list-style-position: inside;
  }

  table {
    width: 100%;
    margin-bottom: var(--spacing-8);
    border-collapse: collapse;
    border-spacing: 0.25rem;
  }
  
  table thead tr th {
    border-bottom: 1px solid var(--color-accent);
  }

  a{
    color: inherit ;  
    text-decoration: none;  
    transition: var(--mainTransition);
    &:hover{             
      opacity : 0.85;
    }    
  }

  textarea{
    width : 100%;
    background-color : ${({ theme }) =>
      theme === "dark" ? "var(--color-card-dark)" : "var(--white)"};
    border:  none ;
    outline : none  ;
    color : inherit ; 
    font-family : var(--fontFamily);
    font-size : 1em;
  }

  small{
    color : var(--gray);
  }
  span.link{
    color : inherit;
  }
  button{
    color : inherit;     
  }    
  .slick-next:before, .slick-prev:before{
    font-size : 30px;
  }
  .image-gallery-image{
    cursor: pointer;
    width : 80%;
  }

  hr{
    opacity: 0.3;
  }
  .linkified{
    color : blue !important;
  }
  .input-chat  a{
    color : blue !important ;
  }
  div.DraftEditor-root {
    width : 100%;
    height: 100%;
  }



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
    padding : 1rem;
    flex:1;  
    max-height: 5rem;
    overflow : auto;
    width : unset !important; 
    margin-right : 5rem;        
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
  
  .wrapper {
    width: 100%;
    max-width: 800px;
    margin: auto;
  }
  
  .wrapper > h1,
  .wrapper > h2 {
    text-align: center;
  }

`;
