import {useEffect, useMemo, useRef, useState} from "react";
import './Autocomplete.css'
import Suggestions from "../Suggestions/Suggestions";
import {scrollIntoView} from "../../helpers/scrollIntoView";
import Tags from "../Tags/Tags";

const Autocomplete = ({tags, setTags, suggestionsList}) => {
  const [suggestionsDropdownVisible, setSuggestionsDropdownVisible] = useState(false)
  const [userTagInput, setUserTagInput] = useState('')
  const [cursor, setCursor] = useState(0);
  const tagsContainerRef = useRef(null);
  const suggestionRef = useRef(null);

  const removeFromTagList = (tagIndex) => {
    setTags(tags.filter((item, index) => index !== tagIndex))
  }

  const addToTagList = (tagName) => {
    if (tagName !== '') {
      setTags(prevTag => [...prevTag, tagName])
      setUserTagInput('')
    }
  }

  const handleClickOutside = (event) => {
    if (tagsContainerRef.current && !tagsContainerRef.current.contains(event.target)) {
      setSuggestionsDropdownVisible(false)
    } else {
      setSuggestionsDropdownVisible(true)
    }
  }

  const keyboardNavigation = (e) => {
    if (e.key === "ArrowDown" && cursor < filteredList.length - 1) {
      setCursor((currentCursor) => currentCursor + 1)
    }
    if (e.key === "ArrowUp" && cursor > 0) {
      setCursor((currentCursor) => currentCursor - 1)
    }
    if (e.key === "Enter") {
      if (filteredList.length < 1) {
        addToTagList(e.target.value)
      } else {
        addToTagList(filteredList[cursor])
      }
    }
    if (e.key === "Backspace" && userTagInput.length === 0) {
      removeFromTagList(tags.length - 1)
    }
  };

  function getFilteredList() {
    return suggestionsList.filter((tagName) => tagName.toLowerCase().startsWith(userTagInput.toLowerCase()));
  }

  const filteredList = useMemo(getFilteredList, [userTagInput, suggestionsList]);

  useEffect(() => {
    setCursor(0)
  }, [userTagInput])

  useEffect(() => {
    if (cursor < 5) {
      scrollIntoView(0, suggestionRef)
    } else if (suggestionRef.current) {
      let listItems = Array.from(suggestionRef.current.children);
      listItems[cursor] && scrollIntoView(listItems[cursor].clientHeight * (cursor - 4), suggestionRef);
    }
  }, [cursor]);

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={tagsContainerRef}>
      <div className={'tags-input'}>
        <Tags tags={tags} removeFromTagList={removeFromTagList}/>
        <input data-testid={'input'} type={'text'} placeholder={'Press enter to add'} value={userTagInput}
               onChange={(e) => setUserTagInput(e.target.value)}
               onKeyDown={e => keyboardNavigation(e)}/>
      </div>
      <Suggestions suggestionRef={suggestionRef} filteredList={filteredList}
                   isVisible={suggestionsDropdownVisible}
                   cursor={cursor} setCursor={setCursor} addTag={addToTagList}/>
    </div>
  )
}

export default Autocomplete;
