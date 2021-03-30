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
  --blue-1:#1e88e5 ;
  --blue-2:#1565c0 ;
  --blue-3:#0d47a1  ;
  --dark-blue: #003e9a;
  --indigo-1: #3949ab;
  --indigo-2 : #283593;   
  --red: #dc3545;  
  --green-1: #43a047;  
  --green-2 : #2e7d32;   
  --white: #fff;
  --gray-light-1: #bdbdbd ;
  --gray-light-2: #9e9e9e;
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
  --cyan-1 : #00acc1; 
  --cyan-2 : #00838f;
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
  
  --color-border-dark : #616161;   
  --color-border-default : #e0e0e0;

  --fontFamily-sans: Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --fontFamily-serif: "Merriweather", "Georgia", Cambria, "Times New Roman",
    Times, serif;
  --fontFamily: system-ui,-apple-system,BlinkMacSystemFont,Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  --gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));  
  --lightShadow: 0px 1px 1.5px 1.5px rgba(0, 0, 0, 0.1);
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


  .public-DraftEditorPlaceholder-root{
    position : absolute;
    opacity: 0.3 ;
  }
  .e17si09n {
    position: absolute;
    right: 0;
    top: 0.3rem;
    bottom: 0.3rem;
    width: 0.25rem;
    background-color: #e0e0e0;
    border-radius: 0.125rem;
    opacity: 0.1;
    -webkit-transition: opacity 0.4s;
    transition: opacity 0.4s;
  }
  .e19xmvdb {
    margin: 1rem 0;
    padding-left: 0.5rem;
    font-weight: normal;
    font-size: 1rem;
    color: #9e9e9e;
  }
  .e1g1wugw {
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    display: inline-block;
    overflow: hidden;
    max-width: 1.95ch;
    max-height: 1rem;
    line-height: inherit;
    margin: -0.2ex 0em 0.2ex;
    color: transparent;
    min-width: 1rem;
  }
  .esyutjr {
    border: 1px solid #eee;
    margin-top: 1.75rem;
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
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    box-sizing: border-box;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
  }
  .e1eijkox {
    cursor: pointer;
    padding: 5px 10px 1px 10px;
    -webkit-transition: background-color 0.4s
      cubic-bezier(0.27, 1.27, 0.48, 0.56);
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  }
  .e1eijkox:active {
    background-color: #cce7ff;
  }
  .e1adbvmt {
    padding: 5px 10px 1px 10px;
    -webkit-transition: background-color 0.4s
      cubic-bezier(0.27, 1.27, 0.48, 0.56);
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
    background-color: #e6f3ff;
  }
  .e1adbvmt:active {
    background-color: #cce7ff;
  }
  .e13wg9oj {
    display: inline-block;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 368px;
    font-size: 0.9rem;
  }
  .e1w5jrn9 {
    width: 1em;
    height: 1em;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    display: inline-block;
  }
  .e183m4hm {
    display: inline-block;
    position: relative;
    bottom : unset; 
    right : unset; 
  }
  .e8k2yoa {
    width: unset;
    height: unset;
    font-size: 1.2rem;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: unset;
    color: #43a047;
    font-weight: bold;
  }
  .e8k2yoa:focus {
    outline: 0;
  }
  .e8k2yoa:hover {
    color: #2e7d32;
    background-color: transparent;
  }
  .e8k2yoa:active {
    color: #2e7d32;
  }
  .e13wqaj6 {
    width: unset;
    height: unset;
    font-size: 1.2rem;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: unset;
    color: #43a047;
    font-weight: bold;
  }
  .e13wqaj6:focus {
    outline: 0;
  }
  .e13wqaj6:hover {
    color: #2e7d32;
  }
  .e13wqaj6:active {
    color: #2e7d32;
  }
  .ec6zxdw > div {
    overscroll-behavior: contain;
  }
  .ejr02pv {
    margin-top: 10px;
    padding: 0 0.3rem;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 1000;
    box-sizing: content-box;
    background: #fff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 30px 0 gainsboro;
    width: 21rem;
    overflow-x: hidden;
  }
  .e6amujp {
    display: none;
  }
  .e16zneum {
    margin: 0 0 0.3rem;
    padding-left: 1rem;
    height: 2rem;
    line-height: 2.5rem;
    font-weight: normal;
    font-size: 1.2rem;
    color: #9e9e9e;
  }
  .e1kg9q3n {
    margin: 0 0 0.3rem;
    position: relative;
    z-index: 0;
    width: 21rem;
    height: 20rem;
  }
  .e1kg9q3n:hover .e17si09n {
    opacity: 0.3;
  }
  .e1kg9q3n .e17si09n:hover,
  .e1kg9q3n .e17si09n:active {
    opacity: 0.6;
  }
  .e1m341vm {
    padding: 0 0.5rem;
  }
  .e1m341vm:first-child .e19xmvdb {
    display: none;
  }
  .e13arc1 {
    margin: 0;
    padding: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    list-style: none;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .e6nwac2 {
    width: 2.5rem;
    height: 2.5rem;
  }
  .e3h4qvg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
  }
  .e1129lxj {
    margin: 0.3rem;
    padding: 0.3rem;
    position: absolute;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    list-style: none;
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.1);
  }
  .eug7aee {
    width: 2.5rem;
    height: 2.5rem;
  }
  .eug7aee:first-child {
    border-right: 1px solid #e0e0e0;
  }
  .eyoq5wq {
    padding: 0;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    -webkit-transition: background-color 0.4s
      cubic-bezier(0.27, 1.27, 0.48, 0.56);
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  }
  .e1eigyu0 {
    padding: 0;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    -webkit-transition: background-color 0.4s
      cubic-bezier(0.27, 1.27, 0.48, 0.56);
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
    background-color: #efefef;
  }
  .e11mkpma {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
  }
  .e1cibj9i {
    margin: 0;
    padding: 0 0.5rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 90%;
    list-style: none;
  }
  .e2bpndj {
    width: 2.5rem;
    height: 2.5rem;
  }
  .e1qma4nk {
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    color: #bdbdbd;
    background: none;
    border: none;
    outline: none;
  }
  .e1q5rpho {
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 1.2rem;
    color: #bdbdbd;
    background: none;
    border: none;
    outline: none;
    color: #42a5f5;
  }
  .e1duapnp {
    background-color: #000;
    border-radius: 0.125rem;
    cursor: pointer;
  }
  /* 
.m6zwb4v,
.m6zwb4v:visited {
  color: #575f67;
  cursor: pointer;
  display: inline-block;
  background: #e6f3ff;
  padding-left: 2px;
  padding-right: 2px;
  border-radius: 2px;
  -webkit-text-decoration: none;
  text-decoration: none;
}
.m6zwb4v:hover,
.m6zwb4v:focus {
  color: #677584;
  background: #edf5fd;
  outline: 0;
}
.m6zwb4v:active {
  color: #222;
  background: #455261;
}

.m1ymsnxd {
  padding: 7px 10px 3px 10px;
  -webkit-transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
}
.m1ymsnxd:active {
  background-color: #cce7ff;
}
.m126ak5t {
  padding: 7px 10px 3px 10px;
  -webkit-transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  background-color: #e6f3ff;
}
.m126ak5t:active {
  background-color: #cce7ff;
}
.mtiwdxc {
  display: inline-block;
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 368px;
  font-size: 0.9em;
  margin-bottom: 0.2em;
}
.myz2dw1 {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 12px;
} */
  .mnw6qvm {
    max-height: 15rem;
    overflow: auto;
  }
`;
