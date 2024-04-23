import styled,{css} from 'styled-components'

export const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  flex-direction: row; 
`;

export const Image = styled.img`
  width: 100px;
  height: auto;
  margin-right: 10px;
  border-radius: 5px;
`;

export const ItemBox = styled.div`
  flex: 1;
`;

export const QuantityButton = styled.button`
  margin: 0 5px;
  padding: 5px; /* 작은 패딩 */
  width: 30px; /* 작은 너비 */
  height: 30px; /* 작은 높이 */
  border: 1px solid #758bfd; /* 테두리 추가 */
  border-radius: 5px; /* 둥근 모서리 */
  background-color: #758bfd; /* 배경색 변경 */
  color: #fff;
  font-size: 0.9rem; /* 작은 폰트 크기 */
  cursor: pointer;
  transition: background-color 0.3s ease; /* 부드러운 색상 변화 */
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #5b6ace; /* 호버 시 색상 변화 */
  }
`;

export const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CartBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
`;

export const CartPayContainer = styled.div`
  width: 30%;
  margin-left: 100px;
  margin-top: 10%;
`;

