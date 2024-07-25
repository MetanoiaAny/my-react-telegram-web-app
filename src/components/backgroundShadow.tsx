import styled from "styled-components";



interface ShadowProps {
  $shadowColor?: string;
  $filter?: string;
}

export const PointShadow = styled.div<ShadowProps>`
  background: ${(props) => props.$shadowColor};

  filter: ${(props) => props.$filter};
`;
