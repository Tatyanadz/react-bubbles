import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth'
import styled from 'styled-components'



const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    
    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(result => {
        setEditing(false)
        updateColors(
          colors.map(item => {
            return item.id === colorToEdit.id ? colorToEdit : item;
          })
        )
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(response => {
        updateColors(
          colors.filter(color => {
            return color.id !== response.data
          })
        )
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;


const FormDiv = styled.form`
  label {
    font-size: 1em;
    padding: 5px;
  }
  width: 100%;
  input {
    background: none;
    border: none;
    color: black;
    border-bottom: 1px solid black;
    margin-top: 0;
    font-size: 1em;
  }
`;
