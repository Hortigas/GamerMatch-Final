import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   :root {
    font-size: 60%;

      --background: #f0f2f5;
      --shape: #ffffff;

      --red: #e52e4d;
      --blue: #5429cc;
      --blue-light: #6955ff;
      --green: #33cc95;

      --text-title: #363f5f;
      --text-body: #969cb3;
   }

   * {
      margin:0;
      padding:0;
      box-sizing: border-box;
   }

   body {
      -webkit-font-smoothing: antialiased;
      background-color: #14171e;
   }

body,
input,
button,
textarea {
    font: 500 1.6rem Poppins;
    border: none;
    outline: none;
}

button {
    cursor: pointer;
}

a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
}

.toast {
    font: 500 1.6rem Poppins;
}

[disabled] {
      opacity:0.6;
      cursor: not-allowed;
}

   .react-modal-overlay {
      background : rgba(0,0,0,0.5);

      position:fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left:0;

      display: flex;
      align-items: center;
      justify-content: center;

      z-index:10;
   };

   .react-modal-content {
      width:100%;
      max-width:500px;
      background:#15171E;
      padding:40px;
      position: relative;
      border-radius:10px;

   };
`;
