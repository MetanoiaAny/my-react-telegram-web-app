import styled from "styled-components";



interface ShadowProps {
  $shadowColor?: string;
  $filter?: string;
}

export const PointShadow = styled.div<ShadowProps>`
  background: ${(props) => props.$shadowColor};

  filter: ${(props) => props.$filter};
`;


export const TopDivider =styled.div`
  background:  linear-gradient(90deg, rgba(216, 216, 216, 0.06) 25%, #D8D8D8 59%, rgba(216, 216, 216, 0) 98%) ;
  width: 100%;
  height: 1px;
`
