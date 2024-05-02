import styled from 'styled-components';

export const StyledContent = styled.div`
    width: 100%;
    margin-top: 100px;

    h1 {
    font-size: 25px;
    font-weight: bold;
    }

    .image_container {
        display: flex;
        margin-left: 300px;
        overflow: hidden;
    }

    .image_sub,
    .image_main {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .image_sub img {
        max-width: 160px;
        max-height: 140px;
        margin-bottom: 20px;
        margin-right: 20px;
        object-fit: cover;
    }

    .image_main img {
        width: 600px;
        height: 400px;
        object-fit: cover; /* 부모에게 맞추거나, 비율유지하면서 잘라내기도 함 */
    }

    .product_info {
        padding-left: 180px;
        width: 800px;
    }



    .btns {
    display: flex;
    justify-content: flex-end;
    padding-right: 460px;
    margin-bottom: 110px;
    position: relative;
    top: -120px;
    left: 140px;
}


    .btn_pick {

    height: 50px;
    background-color: #fff;
    border: 1px solid #343a40;
    font-size: 17px;
    border-radius: 10px;
    margin-left: 10px;
    left: -80px;
    bottom: -50px;
    cursor: pointer;
    transition: background-color 0.3s;
    }

    .btn_pick:hover {
    background-color: #1675F2;
    color: #fff;
    border: none;
    }

    //상품설명,리뷰,교환반품 밑줄 - 파란색 하이라이트
    .clickElement {
        -webkit-user-select: none;
        font-size: 14px;
        cursor: pointer;
    }

    .policy {
        margin: 80px;
        border: 1px solid #343a40;
        white-space: pre-line;
        text-align: center;
        padding:100px; 
    }

    

    .centerLineGroup {
        display: flex;
        justify-content:center;

        .centerLineGroup_img{
          margin-top: 120px;

        }
    }


    .tot{
        display: flex;
        justify-content: flex-end;
        padding-top: 30px;
        padding-right: 300px;
        font-size: 13px;
    }
    
    .tot_amount{
        font-size: 35px;
        font-weight: bold;
        margin-bottom: -200px;
        margin-top: -25px;
        color: #1675F2;
    }

    .line_productDetail{
        width: 55%;
        margin-bottom: 20px;
        margin-left: -10px; 
    }

    .button {
  --width: 260px;
  --height: 50px;
  --tooltip-height: 35px;
  --tooltip-width: 90px;
  --gap-between-tooltip-to-button: 18px;
  --button-color: #fff;
  border: 1px solid #343a40;
  --tooltip-color: #fff;
  width: var(--width);
  height: var(--height);
  background: var(--button-color);
  position: relative;
  text-align: center;
  border-radius: 10px;
  font-family: "Arial";
  transition: background 0.3s;
}


.button::before {
  position: absolute;
  content: attr(data-tooltip);
  width: var(--tooltip-width);
  height: var(--tooltip-height);
  background-color: #1675F2;
  font-size: 0.9rem;
  color: #fff;
  border-radius: .25em;
  line-height: var(--tooltip-height);
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) + 10px);
  left: calc(50% - var(--tooltip-width) / 2);
}

.button::after {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #1675F2;
  left: calc(50% - 10px);
  bottom: calc(100% + var(--gap-between-tooltip-to-button) - 10px);
}

.button::after,.button::before {
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
}

.button-wrapper,.text,.icon {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  color:#000;
}


.text,.icon {
  transition: top 0.5s;
}

.icon {
  color: #fff;
  top: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon svg {
  width: 24px;
  height: 24px;
}

.button:hover {
  background: #1675F2;
  border: none;
}

.button:hover .text {
  top: -100%;
}

.button:hover .icon {
  top: 0;
}

.button:hover:before,.button:hover:after {
  opacity: 1;
  visibility: visible;
}

.button:hover:after {
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) - 20px);
}

.button:hover:before {
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button));
}


.body {
  --radius: 8px;
  --border: 4px;
  --height: 48px;
  --speed: 0.25s;
  display: grid;
  place-items: center;
  align-content: center;
  font-family: "SF Pro Text", "SF Pro Icons", "AOS Icons", "Helvetica Neue",
    Helvetica, Arial, sans-serif, system-ui;
}

.tabs {
  width: 50vw;
  height: var(--height);
  display: grid;
  grid-auto-flow: column;
  background: #fff;
  border-radius: var(--radius);
  grid-auto-columns: 1fr;
  position: relative;
  border: 1px solid #3a3a3a;
}

.tabs {
  --ease: linear(
    0,
    0.1641 3.52%,
    0.311 7.18%,
    0.4413 10.99%,
    0.5553 14.96%,
    0.6539 19.12%,
    0.738 23.5%,
    0.8086 28.15%,
    0.8662 33.12%,
    0.9078 37.92%,
    0.9405 43.12%,
    0.965 48.84%,
    0.9821 55.28%,
    0.992 61.97%,
    0.9976 70.09%,
    1

  );
}

.tabs > .input,
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.tabs:has(:checked:nth-of-type(1)) {
  --active: 0;
}
.tabs:has(:checked:nth-of-type(2)) {
  --active: 1;
}
.tabs:has(:checked:nth-of-type(3)) {
  --active: 2;
}
.tabs:has(:checked:nth-of-type(4)) {
  --active: 3;
}

.tabs :checked + .label {
  --highlight: 1;
}

.tabs:has(.input:nth-of-type(2)) {
  --count: 2;
}
.tabs:has(.input:nth-of-type(3)) {
  --count: 3;
}
.tabs:has(.input:nth-of-type(4)) {
  --count: 4;
}

.tabs .label {
  padding: 0 clamp(10px, 10px + 10px, 20px);
  cursor: pointer;
  text-align: center;
  height: 100%;
  display: grid;
  border-radius: calc(var(--radius) - var(--border));
  place-items: center;
  color:  #000;
  transition: background, color;
  transition-duration: 0.25s;
  transition-timing-function: var(--ease, ease);
}

.input:not(:checked) + .label:hover {
  --highlight: 0.35;
  .input:not(:checked) + .label:hover {
  --highlight: 0.35;
  background: hsl(0 0% 20%);
}
}

.tabs::after {
  pointer-events: none;
  content: "";
  width: calc(100% / var(--count));
  height: 100%;
  background: hsl(0 0% 100%);
  position: absolute;
  border-radius: calc(var(--radius) - var(--border));
  mix-blend-mode: difference;
  translate: calc(var(--active, 0) * 100%) 0;
  transition: translate, outline-color;
  transition-duration: var(--speed);
  transition-timing-function: var(--ease, ease);
  outline: 2px solid transparent;
}

.tabs:has(:focus-visible)::after {
  outline-color: red;
}


`;
