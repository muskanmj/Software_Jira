import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './Components/Board/Board';
import Editable from './Components/Editable/Editable';

function App() {

  const [mounted, setMounted] = useState(false);
  const [boards, setBoards] = useState([

    {
      id: 0,
      title: "To Do",
      cards: [],
      /* {
         id: Date.now() + Math.random(),
         title: "Card 1",
         date: "",
         desc: "bvg hsu sgb"
       },
       {
         id: Date.now() + Math.random(),
         title: "Card 2",
         date: "",
         desc: "bvg hsu sgb"
       },
       {
         id: Date.now() + Math.random(),
         title: "Card 2",
         date: "",
         desc: "bvg hsu sgb"
       },
       {
         id: Date.now() + Math.random(),
         title: "Card 2",
         date: "",
         desc: "bvg hsu sgb"
       }
     ]*/
    },
    {
      id: 1,
      title: "Processing",
      cards: [],
      //   {
      //     id: Date.now() + Math.random(),
      //     title: "Card 1",
      //     date: "",
      //     desc: "bvg hsu sgb"
      //   }
      // ]
    },
    {
      id: 2,
      title: "Testing",
      cards: [],
      //   {
      //     id: Date.now() + Math.random(),
      //     title: "Card 1",
      //     date: "",
      //     desc: "bvg hsu sgb"
      //   },
      //   {
      //     id: Date.now() + Math.random(),
      //     title: "Card 2",
      //     date: "",
      //     desc: "bvg hsu sgb"
      //   }
      // ]
    },
    {
      id: 3,
      title: "Completed",
      cards: [],
      //   {
      //     id: Date.now() + Math.random(),
      //     title: "Card 1",
      //     date: "",
      //     desc: "bvg hsu sgb"
      //   },
      //   {
      //     id: Date.now() + Math.random(),
      //     title: "Card 2",
      //     date: "",
      //     desc: "bvg hsu sgb"
      //   }
      // ]
    },
  ]);

  async function getData() {
    const res = await fetch('http://localhost:8080/user/getAll')
    if (res.status === 200) {
      const result = await res.json();
      if (result.length !== 0) {
        result.forEach((card) => {
          const index = boards.findIndex((item) => item.id === parseInt(card.boardId));
          const tempBoards = [...boards];
          const cards = { ...card, date: card.date }
          tempBoards[index].cards.push(cards);
          setBoards(tempBoards);
        })
      }
    }
  };

  async function updateCardDB(cid, bid, card) {
    const res = await fetch(`http://localhost:8080/user/${cid}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: card.title,
        information: card.information,
        date: card.date,
        boardId: bid,
        id: cid,
      })
    });
    console.log(res.status);
  };

  async function deleteCardDB(cid) {
    const res = await fetch(`http://localhost:8080/user/${cid}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
    });
    console.log(res.status);
  };

  async function addCardDB(card) {
    const res = await fetch('http://localhost:8080/user/add', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: card.title,
        boardId: card.bid
      })
    });
    if (res.status === 200) {
      const result = await res.json();
      return result;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, [])

  useEffect(() => {
    if (!mounted) return;
    getData();
    /*if(localStorage.getItem('items') == null){
      localStorage.setItem('items', JSON.stringify(boards));
      setBoards(JSON.parse(localStorage.getItem('items')));
    }else{
      setBoards(JSON.parse(localStorage.getItem('items')));
    } */ // eslint-disable-next-line
  }, [mounted])


  window.addEventListener('unload', () => {
    //localStorage.setItem('items', JSON.stringify(boards));
  })

  const [target, setTarget] = useState({
    cid: "",
    bid: "",
  });

  const addCard = async (title, bid) => {
    var todayDate = new Date().toISOString().slice(0, 10);
    const cards = {
      title: title,
      date: todayDate,
      desc: "",
    };
    const cid = await addCardDB({ ...cards, bid: bid });
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;
    const card = {
      id: cid,
      title: title,
      date: todayDate,
      information: "",
      boardId: bid,
    };
    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  const moveCard = async (value, bid) => {
    const cards = {
      id: value.id,
      title: value.title,
      date: value.date,
      desc: value.information,
      information: value.information,
      boardId: bid,
    };

    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoardsOne = [...boards];
    tempBoardsOne[index].cards.push(cards);
    setBoards(tempBoardsOne);

    const res = await fetch(`http://localhost:8080/user/${cards.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: cards.title,
        information: cards.desc,
        date: cards.date,
        boardId: bid,
        id: cards.id,
      })
    });
    if (res.status === 200) {
      removeCardMove(parseInt(value.id), parseInt(value.boardId))
    }
  };


  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    console.log(bIndex);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    console.log(cIndex);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
    deleteCardDB(cid);
  };

  const removeCardMove = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    console.log(bIndex);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    console.log(cIndex);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };


  const handleDragEnd = (cid, bid, card) => {
    /*let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    s_bIndex = boards.findIndex((item) => item.id === bid);
    if (s_bIndex < 0) return;

    s_cIndex = boards[s_bIndex]?.cards?.findIndex((item) => item.id === cid);
    if (s_cIndex < 0) return;

    t_bIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_bIndex < 0) return;

    t_cIndex = boards[t_bIndex]?.cards?.findIndex((item) => item.id === target.cid);
    if (t_cIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);
    setBoards(tempBoards);*/
    moveCard(card, target.bid);
  };

  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid,
    });
  };

  const updateCard = (cid, bid, cards) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards]
    tempBoards[bIndex].cards[cIndex] = cards;
    setBoards(tempBoards);
    updateCardDB(cid, bid, cards)
  }

  // useEffect(()=>{
  //   localStorage.setItem('Jira',JSON.stringify(boards));
  // },[boards])

  return (
    <div className="app">
      <div className="app_nav">
        <h1>JIRA   <span className="s_dec">SOFTWARE</span></h1>
        <div className="app_nav_button">
          <Editable
            displayClass="app_nav_button_add"
            text="Create Task" placeholder="Enter Board Title"
            onSubmit={(value) => { addCard(value, boards[0]?.id) }}
          />
        </div>
      </div>
      <div className="app_outer">
        <div className="app_boards">
          {
            boards.map((item) => (
              <Board key={item.id} board={item}
                boards={boards}
                moveCard={moveCard}
                addCard={addCard}
                removeCard={removeCard}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                updateCard={updateCard}
              />
            ))
          }

        </div>
      </div>
    </div>
  );
}

export default App;
