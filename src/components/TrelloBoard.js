import React, { useEffect } from "react";
import TrelloList from "./TrelloList";
import { useDispatch, useSelector } from "react-redux";
import TrelloCreate from "./TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard } from "../actions";
import { Link } from "react-router-dom";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

// TODO: Fix performance issue

const TrelloBoard = (props) => {

  const dispatch = useDispatch();
  const boardsSelector = useSelector(state => state.boards);
  const cardsSelector = useSelector(state => state.cards);
  const listsSelector = useSelector(state => state.lists);

  console.log(boardsSelector);

  useEffect(() => {
    const { boardID } = props.match.params;

    dispatch(setActiveBoard(boardID));
  }, [])

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };
  
    const match = props.match;
    const boardID = match.params.boardID;
    const board = boardsSelector[boardID];
    if (!board) {
      return <p>Board not found</p>;
    }
    const listOrder = board.lists;

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Link to="/">Go Back</Link>
        <h2>{board.title}</h2>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listOrder.map((listID, index) => {
                const list = listsSelector[listID];
                console.log("LIST", list)
                if (list) {
                  const listCards = list.cards.map(cardID => cardsSelector[cardID]);

                  return (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                } else {
                  return null;
                }
              })}
              {provided.placeholder}
              <TrelloCreate list />
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
}

export default TrelloBoard;
