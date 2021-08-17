import React, { useEffect, useState } from 'react';
import Moves from './Moves';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';
import './styles.css';

const Game = () => {
    const [history, setHistory] = useState([
        {
            squares: Array(9).fill(null)
        }
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true)
    const [status, setStatus] = useState('');
    const [current, setCurrent] = useState(history[stepNumber]);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        setWinner(calculateWinner(current.squares));

        if (winner) {
            setStatus("Winner: " + winner);
        } else {
            setStatus("Next player: " + (xIsNext ? "X" : "O"));
        }
    }, [current, winner, xIsNext]);

    const handleClick = (i) => {
        let newHistory = history.slice(0, stepNumber + 2);
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? "X" : "O";
        newHistory = newHistory.concat([{ squares }])
        setHistory(newHistory);
        setCurrent(newHistory[newHistory.length - 1]);
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0)
        setCurrent(history[step]);
        setHistory(history.slice(0, step + 1))
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={handleClick}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>
                    <Moves history={history} jumpTo={jumpTo} />
                </ol>
            </div>
        </div>
    );
};

export default Game;