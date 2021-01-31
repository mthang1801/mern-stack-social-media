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
  --font-body: var(--fontFamily-serif);
  --font-heading: var(--fontFamily-sans);
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
  --gray-light: #dedede;
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
`