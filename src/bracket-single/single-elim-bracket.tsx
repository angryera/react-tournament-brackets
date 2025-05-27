import React from 'react';
import { ThemeProvider } from 'styled-components';
import { sortAlphanumerically } from '../utils/string';
import { calculateSVGDimensions } from '../core/calculate-svg-dimensions';
import { MatchContextProvider } from '../core/match-context';
import MatchWrapper from '../core/match-wrapper';
import RoundHeader from '../components/round-header';
import { getPreviousMatches } from '../core/match-functions';
import { MatchType, SingleElimLeaderboardProps } from '../types';
import { defaultStyle, getCalculatedStyles } from '../settings';
import { calculatePositionOfMatch } from './calculate-match-position';

import Connectors from './connectors';
import defaultTheme from '../themes/themes';

function SingleEliminationBracket({
  matches,
  matchComponent,
  currentRound,
  onMatchClick,
  onPartyClick,
  svgWrapper: SvgWrapper = ({ children }) => <div>{children}</div>,
  theme = defaultTheme,
  options: { style: inputStyle } = {
    style: defaultStyle,
  },
}: SingleElimLeaderboardProps) {
  const style = {
    ...defaultStyle,
    ...inputStyle,
    roundHeader: {
      ...defaultStyle.roundHeader,
      ...(inputStyle?.roundHeader ?? {}),
    },
    lineInfo: {
      ...defaultStyle.lineInfo,
      ...(inputStyle?.lineInfo ?? {}),
    },
  };

  const { roundHeader, columnWidth, canvasPadding, rowHeight, width } =
    getCalculatedStyles(style);

  const lastGame = matches.find(match => !match.nextMatchId);

  const generateColumn = (matchesColumn: MatchType[]): MatchType[][] => {
    const previousMatchesColumn = matchesColumn.reduce<MatchType[]>(
      (result, match) => {
        return [
          ...result,
          ...matches
            .filter(m => m.nextMatchId === match.id)
            .sort((a, b) => sortAlphanumerically(a.name, b.name)),
        ];
      },
      []
    );

    if (previousMatchesColumn.length > 0) {
      return [...generateColumn(previousMatchesColumn), previousMatchesColumn];
    }
    return [previousMatchesColumn];
  };
  const generate2DBracketArray = (final: MatchType) => {
    return final
      ? [...generateColumn([final]), [final]].filter(arr => arr.length > 0)
      : [];
  };
  const columns = lastGame ? generate2DBracketArray(lastGame) : [];
  // [
  //   [ First column ]
  //   [ 2nd column ]
  //   [ 3rd column ]
  //   [ lastGame ]
  // ]

  const { gameWidth, gameHeight, startPosition } = calculateSVGDimensions(
    columns[0].length,
    columns.length,
    rowHeight,
    columnWidth,
    canvasPadding,
    roundHeader,
    currentRound
  );

  return (
    <ThemeProvider theme={theme}>
      <SvgWrapper
        bracketWidth={gameWidth}
        bracketHeight={gameHeight}
        startAt={startPosition}
      >
        <svg
          height={gameHeight}
          width={gameWidth}
          viewBox={`0 0 ${gameWidth} ${gameHeight}`}
        >
          <MatchContextProvider>
            {columns.map((matchesColumn, columnIndex) => {
              return matchesColumn.map((match, rowIndex) => {
                const { x, y } = calculatePositionOfMatch(
                  rowIndex,
                  columnIndex,
                  {
                    canvasPadding,
                    columnWidth,
                    rowHeight,
                  }
                );
                const previousBottomPosition = (rowIndex + 1) * 2 - 1;

                const { previousTopMatch, previousBottomMatch } =
                  getPreviousMatches(
                    columnIndex,
                    columns,
                    previousBottomPosition
                  );
                return (
                  <g key={x + y}>
                    {roundHeader && roundHeader.isShown && (
                      <RoundHeader
                        x={x}
                        y={0}
                        roundHeader={roundHeader}
                        canvasPadding={canvasPadding || 0}
                        width={width || 0}
                        numOfRounds={columns.length}
                        tournamentRoundText={match.tournamentRoundText || ''}
                        columnIndex={columnIndex}
                      />
                    )}
                    {columnIndex !== 0 && (
                      <Connectors
                        {...{
                          bracketSnippet: {
                            currentMatch: match,
                            previousTopMatch,
                            previousBottomMatch,
                          },
                          rowIndex,
                          columnIndex,
                          gameHeight,
                          gameWidth,
                          style,
                        }}
                      />
                    )}
                    <g>
                      <MatchWrapper
                        x={x}
                        y={
                          y +
                          (roundHeader && roundHeader.isShown
                            ? (roundHeader.height ?? 0) +
                              (roundHeader.marginBottom ?? 0)
                            : 0)
                        }
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        match={match}
                        previousBottomMatch={previousBottomMatch}
                        topText={match.startTime}
                        bottomText={match.name}
                        teams={match.participants}
                        onMatchClick={onMatchClick}
                        onPartyClick={onPartyClick}
                        style={style}
                        matchComponent={matchComponent}
                      />
                    </g>
                  </g>
                );
              });
            })}
          </MatchContextProvider>
        </svg>
      </SvgWrapper>
    </ThemeProvider>
  );
}

export default SingleEliminationBracket;
