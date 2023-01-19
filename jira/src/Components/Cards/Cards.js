import React, { useState } from "react";
import { Clock, MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "./CardInfo/CardInfo";
import './Cards.css';

function Cards(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDropDown = (e) => {
    setShowDropdown(true);
    e.stopPropagation();
  }

  const handleDropDownClose = (e) => {
    setShowDropdown(false);
    e.stopPropagation();
  }

  return (
    <>
      {showModal && (<CardInfo
        cards={props.cards}
        boards={props.boards}
        moveCard={props.moveCard}
        addCard={props.addCard}
        updateCard={props.updateCard}
        boardId={props.boardId}
        onClose={() => setShowModal(false)} />)}
      <div className="cards" draggable
        onDragEnd={() => props.handleDragEnd(props.cards?.id, props.boardId, props.cards)}
        onDragEnter={() => props.handleDragEnter(props.cards?.id, props.boardId)}
        onClick={() => setShowModal(true)}
      >

        <div className="cards_top">
          <div className="cards_top_more" onClick={(e) => handleDropDownClose(e)}>
            <MoreHorizontal onClick={(e) => { handleDropDown(e) }} />
            {showDropdown && (
              <Dropdown onClose={(e) => handleDropDownClose(e)}>
                <div onClick={() => { props.removeCard(props.cards.id, props.boardId); }} className="cards_dropdown">
                  <p>Delete Card</p>
                </div>
              </Dropdown>
            )}

          </div>
        </div>
        <div className="cards_title">
          <p id="title-text">{props.cards.information === undefined ? props.cards?.desc : props.cards?.information}</p>
        </div>
        <div className="cards_footer">
          <p style={{ display:'flex', alignItems: 'center'}} ><Clock style={{color: 'red'}} /><p id="date">{props.cards?.date}</p></p>
          <p className="cards_footer_title">{props.cards?.title.length > 20? props.cards?.title.substring(0,20)+'...' : props.cards?.title }</p>
        </div>
      </div>
    </>
  );
}

export default Cards;