import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
  :root{
    --white : #fff; 
    --black : #000;
    --indigo-1 : #3949ab;
    --indigo-2 : #283593;
    --indigo-3 : #1a237e;  
    --blue-1 : #1e88e5;
    --blue-2 : #1565c0;
    --blue-3 : #0d47a1;
    --light-blue-1 : #039be5;
    --light-blue-2 : #0277bd;
    --light-blue-3 : #01579b;
    --cyan-1 : #00acc1;
    --cyan-2 : #00838f;
    --cyan-3 : #006064;
    --green-1 : #43a047;
    --green-2 : #2e7d32;
    --green-3: #1b5e20;
    --red-1: #e53935 ;   
    --red-2: #c62828 ;   
    --red-3: #b71c1c ;   
    --light-gray-1: #f5f5f5 ;
    --light-gray-2: #e0e0e0 ;
    --light-gray-3: #9e9e9e  ;
    --gray-1 : #616161;
    --gray-2 : #424242;
    --gray-3 : #212121;        
    --amber-1 : #ffb300;
    --amber-2 : #ffa000;

    --success :  #43a047;
    --warning : #ffb300; 
    --error :  #e53935 ;

    --mainTransition : all 0.2s;
    --fontFamily-sans: Montserrat,system-ui,-apple-system,BlinkMacSystemFont, "Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif, "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    --fontFamily-serif: "Merriweather","Georgia",Cambria,"Times New Roman", Times,serif;


    --text: #000000;
    --background: #fff;
    --backgroundSecondary : #b4b4b4;    
    --panelBackground: #f9f9f9;
    --hover-background: #f5f5f5;
    --hover-text: #ffc107;
    --border: #e0e0e0;
    --boxShadow: 0 0 3px 3px #f5f5f5;
    --disabled-background: #f5f5f5;
    --disabled-color: #424242;
    --card-primary: #fff;
    --card-secondary: #17181a;    
    --border: #e0e0e0;
    --notification-hasSeen: #f2f2f2;
    --notification-unSeen: #d4d4d4;
    --link : #2e89ff;
  }
  *, *:after, *:before{
    padding : 0; 
    margin: 0;
    box-sizing: border-box;
  } 
  html{    
    overflow-x :hidden;
  }
  body{    
    background-color : ${({ theme }) =>
      theme ? theme.background : '#fff'}    ;
    color : ${({ theme }) => (theme ? theme.text : 'var(--gray-3)')} ;
    margin : 0; 
    padding : 0 ;    
    overflow-x: hidden;           
    font-family : var(--fontFamily-sans);
    transition: background-color 0.1s ease;
    font-size : 1rem;   
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
  

  span:focus,
  div:focus,
  p:focus{
    outline : none !important;
  }

  a{
    color: inherit ;  
    text-decoration: none;  
    transition: var(--mainTransition);
    &:hover{             
      opacity : 0.85;
    }    
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
    background-color: var(--blue-1);    
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
  background-color: var(--blue-1);  
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
    & > *{
      background-color : ${({ theme }) =>
        theme ? theme.panelBackground : 'var(--panelBackground)'};
      
      color : ${({ theme }) => (theme ? theme.text : 'var(--text)')}    
  }
`;
