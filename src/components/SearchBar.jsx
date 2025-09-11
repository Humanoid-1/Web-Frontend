import React from 'react'
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 30px;
  padding: 8px 15px;
  width: 40%;
  max-width: 500px;
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 68%;
    margin: 0 10px;
    order: 3;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  padding: 5px 10px;
  font-size: 14px;
  color: #2c3e50;
  outline: none;

  &::placeholder {
    color: #95a5a6;
  }
`;

const SearchIcon = styled(IoIosSearch)`
  color: #7f8c8d;
  font-size: 20px;
  margin-right: 5px;
`;


// New Styled Component for Search Button
const SearchButton = styled.button`
  background: #3498db;
  border: none;
  outline: none;
  padding: 10px 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2980b9;
  }

  svg {
    color: #fff;
    font-size: 18px;
  }
`;


const SearchBar = () => {
  return (
    <SearchContainer>
          
          <SearchInput type="text" placeholder="Search products..." />
          <SearchButton>
            <IoIosSearch className="SearchIcon" />
          </SearchButton>
        </SearchContainer>
  )
}

export default SearchBar