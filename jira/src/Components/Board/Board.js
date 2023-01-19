import React from "react";
import Cards from "../Cards/Cards";
import Editable from "../Editable/Editable";
import './Board.css';

function Board(props) {
  return (
    <div className="board">
      <div className="board_top">
        <p className="boards_top_title">{props.board?.title}  <span>{` ${props.board?.cards?.length}`}</span></p>
      </div>
      <div className="board_cards">
        {
          props.board?.cards?.map((item) => (
            <Cards key={item.id} cards={item}
              addCard={props.addCard}
              moveCard={props.moveCard}
              boards={props.boards}
              boardId={props.board.id}
              removeCard={props.removeCard}
              handleDragEnd={props.handleDragEnd}
              handleDragEnter={props.handleDragEnter}
              updateCard={props.updateCard}
            />
          ))
        }
        <Editable
          displayClass="board_cards_add"
          text="Add Card"
          placeholder="Enter Card Title"
          onSubmit={(value) => props.addCard(value, props.board?.id)}
        />
      </div>
    </div>
  );
}

export default Board;