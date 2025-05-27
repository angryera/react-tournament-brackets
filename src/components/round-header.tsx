import React from 'react';
import styled from 'styled-components';
import { OptionsType } from '../types';

export interface RoundHeaderProps {
  x: number;
  y: number;
  width: number;
  roundHeader: OptionsType['roundHeader'] | undefined;
  canvasPadding: number;
  numOfRounds: number;
  tournamentRoundText: string;
  columnIndex: number;
}

const Text = styled.text`
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.textColor.highlighted};
`;
const Rect = styled.rect.attrs(({ theme }) => ({
  fill: theme.roundHeaders.background,
}))``;

export default function RoundHeader({
  x,
  width,
  roundHeader,
  canvasPadding,
  numOfRounds,
  tournamentRoundText,
  columnIndex,
  y = 0,
}: RoundHeaderProps) {
  return (
    <g>
      <Rect
        x={x}
        y={y + canvasPadding}
        width={width}
        height={roundHeader?.height || 0}
        fill={roundHeader?.backgroundColor || 'transparent'}
        rx="3"
        ry="3"
      />
      <foreignObject
        x={x}
        y={y + canvasPadding}
        width={width}
        height={roundHeader?.height || 0}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: 10,
          }}
        >
          <div
            style={{
              width: 274,
              height: 40,
              left: 0,
              top: 0,
              position: 'absolute',
              background: '#F3F3F3',
              boxShadow: '0px 0px 0px 6px white',
              borderRadius: 10,
              border: '1px #E7E7E7 solid',
            }}
          />
          <div
            style={{
              width: 187.58,
              left: 44.26,
              top: 13,
              position: 'absolute',
              textAlign: 'center',
              color: 'black',
              fontSize: 16,
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: '700',
              wordWrap: 'break-word',
            }}
          >
            Round of 16
          </div>
        </div>
      </foreignObject>
      <Text
        x={x + width / 2}
        y={y + canvasPadding + (roundHeader?.height || 0) / 2}
        style={{
          fontFamily: roundHeader?.fontFamily || 'inherit',
          fontSize: `${roundHeader?.fontSize || 12}px`,
          color: roundHeader?.fontColor || 'black',
        }}
        fill="currentColor"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {!roundHeader?.roundTextGenerator &&
          columnIndex + 1 === numOfRounds &&
          'Final'}
        {!roundHeader?.roundTextGenerator &&
          columnIndex + 1 === numOfRounds - 1 &&
          'Semi-final'}
        {!roundHeader?.roundTextGenerator &&
          columnIndex + 1 < numOfRounds - 1 &&
          `Round ${tournamentRoundText}`}
        {roundHeader?.roundTextGenerator &&
          roundHeader.roundTextGenerator(columnIndex + 1, numOfRounds)}
      </Text>
    </g>
  );
}
