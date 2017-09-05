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
        <Text>Gruppe vinder</Text>
      </Container>
      <Container>
        <Indicator color={colors.yellow} />
        <Text>Nummer 2 i gruppen</Text>
      </Container>
      <Container>
        <Indicator color={colors.red} />
        <Text>Nummer 3 i gruppen</Text>
      </Container>
      <Container>
        <Indicator color={colors.white} />
        <Text>Nummer 4 eller lavere i gruppen</Text>
      </Container>
      <Container>
        <Indicator color={colors.redYellowSmall} />
        <Text>Laveste toer</Text>
      </Container>
    </div>
  );
}
