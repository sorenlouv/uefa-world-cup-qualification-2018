import React from 'react';
import styled from 'styled-components';
import { colors } from './styles';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Indicator = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid #ccc;
  background: ${props => props.color};
  border-radius: ${props => (props.square ? 0 : '100%')};
`;

const Text = styled.span`margin-left: 10px;`;

export default function Legend() {
  return (
    <div>
      <Container>
        <Indicator color={colors.green} />
        <Text>Group winner</Text>
      </Container>
      <Container>
        <Indicator color={colors.yellow} />
        <Text>Number 2 in group</Text>
      </Container>
      <Container>
        <Indicator color={colors.red} />
        <Text>Number 3 in group</Text>
      </Container>
      <Container>
        <Indicator color={colors.white} />
        <Text>Number 4 or lower in group</Text>
      </Container>
      <Container>
        <Indicator color={colors.redYellowSmall} />
        <Text>Lowest ranked runner-up</Text>
      </Container>
    </div>
  );
}
