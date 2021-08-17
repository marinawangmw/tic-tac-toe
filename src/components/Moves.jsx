import React from 'react';

const Moves = ({ history, jumpTo }) => {

    return (
        <>
            {history.map((step, move) => {
                const desc = move ?
                    'Go to move #' + move :
                    'Go to game start';
                return (
                    <li key={move}>
                        <button onClick={() => jumpTo(move)}>{desc}</button>
                    </li>
                );
            })}
        </>
    );
};

export default Moves;