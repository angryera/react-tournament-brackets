"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const Text = styled_components_1.default.text `
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.textColor.highlighted};
`;
const Rect = styled_components_1.default.rect.attrs(({ theme }) => ({
    fill: theme.roundHeaders.background,
})) ``;
function RoundHeader({ x, width, roundHeader, canvasPadding, numOfRounds, tournamentRoundText, columnIndex, y = 0, }) {
    return ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)(Rect, { x: x, y: y + canvasPadding, width: width, height: (roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.height) || 0, fill: (roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.backgroundColor) || 'transparent', rx: "3", ry: "3" }), (0, jsx_runtime_1.jsx)("foreignObject", Object.assign({ x: x, y: y + canvasPadding, width: width, height: (roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.height) || 0 }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        borderRadius: 10,
                    } }, { children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                width: 274,
                                height: 40,
                                left: 0,
                                top: 0,
                                position: 'absolute',
                                background: '#F3F3F3',
                                boxShadow: '0px 0px 0px 6px white',
                                borderRadius: 10,
                                border: '1px #E7E7E7 solid',
                            } }), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
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
                            } }, { children: "Round of 16" }))] })) })), (0, jsx_runtime_1.jsxs)(Text, Object.assign({ x: x + width / 2, y: y + canvasPadding + ((roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.height) || 0) / 2, style: {
                    fontFamily: (roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.fontFamily) || 'inherit',
                    fontSize: `${(roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.fontSize) || 12}px`,
                    color: (roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.fontColor) || 'black',
                }, fill: "currentColor", dominantBaseline: "middle", textAnchor: "middle" }, { children: [!(roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.roundTextGenerator) &&
                        columnIndex + 1 === numOfRounds &&
                        'Final', !(roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.roundTextGenerator) &&
                        columnIndex + 1 === numOfRounds - 1 &&
                        'Semi-final', !(roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.roundTextGenerator) &&
                        columnIndex + 1 < numOfRounds - 1 &&
                        `Round ${tournamentRoundText}`, (roundHeader === null || roundHeader === void 0 ? void 0 : roundHeader.roundTextGenerator) &&
                        roundHeader.roundTextGenerator(columnIndex + 1, numOfRounds)] }))] }));
}
exports.default = RoundHeader;
//# sourceMappingURL=round-header.js.map