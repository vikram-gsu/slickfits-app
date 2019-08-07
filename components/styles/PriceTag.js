import styled from 'styled-components';

const PriceTag = styled.span`
  display: inline-block;
  transform: rotate(3deg);
  background: ${props => props.theme.red};
  color: white;
  font-weight: 600;
  line-height: 1;
  padding: 3px;
  font-size: 3rem;
  position: absolute;
  top: -3px;
  right: -3px;
`;

export default PriceTag;
