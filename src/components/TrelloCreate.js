import Icon from "@material-ui/core/Icon";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addCard, addList } from "../actions";
import TrelloButton from "./TrelloButton";
import TrelloForm from "./TrelloForm";
import TrelloOpenForm from "./TrelloOpenForm";

function TrelloCreate(props) {

  const [formOpen, setFormOpen] = useState(false);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const openForm = () => {
    setFormOpen(true)
  };

  const closeForm = e => {
    setFormOpen(false)
  };

  const handleInputChange = e => {
    setText(e.target.value)
  };

  const handleAddList = () => {
    

    if (text) {
      setText("")
      dispatch(addList(text));
    }

    return;
  };

  const handleAddCard = () => {
    const { listID } = props;

    if (text) {
      setText("")
      dispatch(addCard(listID, text));
    }
  };

  const list = props.list;
  return formOpen ? (
    <TrelloForm
      text={text}
      onChange={handleInputChange}
      closeForm={closeForm}
    >
      <TrelloButton onClick={list ? handleAddList : handleAddCard}>
        {list ? "Add List" : "Add Card"}
      </TrelloButton>
    </TrelloForm>
  ) : (
    <TrelloOpenForm list={list} onClick={openForm}>
      {list ? "Add another list" : "Add another card"}
    </TrelloOpenForm>
  );
}

export default TrelloCreate;