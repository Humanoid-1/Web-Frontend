// src/components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchContainer = styled.div`
  position: relative;
  flex-direction: column;
  width: 40%;
  max-width: 500px;

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 68%;
    margin: 0 10px;
    order: 3;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 30px;
  padding: 8px 15px;
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
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

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  list-style: none;
  margin: 5px 0 0 0;
  padding: 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f5f5f5;
  }
`;

const CategoryTag = styled.span`
  font-size: 12px;
  color: #777;
  margin-left: 5px;
`;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

   const debounce = setTimeout(async () => {
  if (query.trim().length > 1) {
    try {
      const baseURL = import.meta.env.VITE_API_URL;

      const urls = [
        `${baseURL}/api/laptops/Search?q=${encodeURIComponent(query)}&limit=5`,
        `${baseURL}/api/accessories/Search?q=${encodeURIComponent(query)}&limit=5`,
        `${baseURL}/api/parts/Search?q=${encodeURIComponent(query)}&limit=5`,
      ];


          const fetched = await Promise.all(
            urls.map((url) =>
              fetch(url, { signal: controller.signal }).then((res) => res.json())
            )
          );

          const combined = [
            ...(fetched[0].data || []).map((item) => ({ ...item, category: "Laptop" })),
            ...(fetched[1].data || []).map((item) => ({ ...item, category: "Accessory" })),
            ...(fetched[2].data || []).map((item) => ({ ...item, category: "Part" })),
          ];

          setSuggestions(combined);
        } catch (err) {
          if (err.name !== "AbortError") console.error(err);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [query]);

  const handleSuggestionClick = (item) => {
    if (item.category === "Laptop") {
      navigate(`/brand/${encodeURIComponent(item.brand)}`);
    } else if (item.category === "Accessory") {
      navigate(`/accessories`);
    } else if (item.category === "Part") {
      navigate(`/parts`);
    }

    setQuery("");
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/brand/${encodeURIComponent(query)}`);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <SearchContainer>
      <InputBox>
        <SearchInput
          type="text"
          placeholder="Search laptops, accessories, parts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <SearchButton type="button" onClick={handleSearch}>
          <IoIosSearch />
        </SearchButton>
      </InputBox>

      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((item, idx) => (
            <SuggestionItem key={idx} onClick={() => handleSuggestionClick(item)}>
              <span>
                {item.brand} {item.model || item.name}
              </span>
              <CategoryTag>{item.category}</CategoryTag>
            </SuggestionItem>
          ))}

          <li
            style={{
              padding: "10px",
              cursor: "pointer",
              textAlign: "center",
              background: "#f5f5f5",
              fontWeight: "bold",
            }}
            onClick={handleSearch}
          >
            See all results for "{query}"
          </li>
        </SuggestionsList>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
