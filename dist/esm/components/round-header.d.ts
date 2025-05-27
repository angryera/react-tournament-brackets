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
export default function RoundHeader({ x, width, roundHeader, canvasPadding, numOfRounds, tournamentRoundText, columnIndex, y, }: RoundHeaderProps): import("react/jsx-runtime").JSX.Element;
