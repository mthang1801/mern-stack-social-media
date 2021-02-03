import {createGlobalStyle} from "styled-components"

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
  --color-text: #2e353f;
  --color-text-light: #4f5969;
  --color-heading: #1a202c;
  --color-heading-black: black;
  --color-accent: #d1dce5;
  --abyss : #07223d;
  --color-background-default: #f0f0f0;
  --color-text-default : #000;
  --color-background-dark : #202020;
  --color-text-dark : #fff;
  --gray-light: #dedede;
  --gray-deep : #bfbfbf;
  --mainTransition: 0.15s all;
  --transition-delay : 0.5s;
  --blue: #0d6efd;
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
  --fontFamily-sans: Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --fontFamily-serif: "Merriweather", "Georgia", Cambria, "Times New Roman",
    Times, serif;
  --fontFamily: system-ui,-apple-system,BlinkMacSystemFont,Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  --gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
  --lightShadow: 2px 5px 3px 1px rgba(0, 0, 0, 0.5);
  --darkShadow: 4px 10px 5px 1px rgba(0, 0, 0, 0.5);    
  font-size : ${({rootFont}) => rootFont ? `${rootFont}px` : "16px"}
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
    margin: var(--spacing-0) var(--spacing-0) var(--spacing-8) var(--spacing-0);
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
  span.link{
    color : inherit;
  }
  button{
    color : inherit;     
  }  
`