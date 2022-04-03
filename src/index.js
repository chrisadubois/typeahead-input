import { search } from "./data";
import "./styles.css";

const suggestions = document.getElementById("results");

const getSearchValueFromInput = (input) => {
  let searchValue = input.target.value;
  searchValue = searchValue.trim();
  return searchValue;
};

const clearMatches = () => {
  while (suggestions.firstChild) {
    suggestions.removeChild(suggestions.firstChild);
  }
};

const addMatches = (matches, input) => {
  matches.forEach((match) => {
    const suggestion = document.createElement("li");
    suggestion.classList.add("suggestion");
    const text = document.createElement("span");
    suggestion.appendChild(text);
    text.innerHTML = styledMatcher(match, input);
    suggestions.appendChild(suggestion);
  });
};

const styledMatcher = (value, input) => {
  const charMatch = new RegExp(input, "i");
  const highlighted = charMatch.exec(value)[0];
  return value.replace(highlighted, `<strong>${highlighted}</strong>`);
};

const handleTypeahead = async (event) => {
  const searchValue = getSearchValueFromInput(event);
  if (!searchValue || !searchValue.length) {
    clearMatches();
    return;
  }
  search(searchValue).then((matches) => {
    clearMatches();
    addMatches(matches, searchValue);
  });
};

document.getElementById("typeahead").addEventListener("input", handleTypeahead);
