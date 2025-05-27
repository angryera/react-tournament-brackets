import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import RoundHeader from '../components/round-header';
import { calculatePositionOfMatchLowerBracket } from './calculate-match-position';
function RoundHeaders({ numOfRounds, calculatedStyles: { canvasPadding, columnWidth, rowHeight, roundHeader, width, }, }) {
    return (_jsx(_Fragment, { children: [...new Array(numOfRounds)].map((matchesColumn, columnIndex) => {
            const { x } = calculatePositionOfMatchLowerBracket(0, columnIndex, {
                canvasPadding,
                columnWidth,
                rowHeight,
            });
            return (_jsx("g", { children: roundHeader && roundHeader.isShown && (_jsx(RoundHeader, { x: x, y: 0, roundHeader: roundHeader, canvasPadding: canvasPadding !== null && canvasPadding !== void 0 ? canvasPadding : 0, width: width !== null && width !== void 0 ? width : 0, numOfRounds: numOfRounds, tournamentRoundText: (columnIndex + 1).toString(), columnIndex: columnIndex })) }, `round ${x}`));
        }) }));
}
export default RoundHeaders;
//# sourceMappingURL=round-headers.js.map