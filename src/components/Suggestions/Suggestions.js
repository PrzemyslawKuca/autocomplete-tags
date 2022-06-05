import './Suggestions.css';

const Suggestions = ({suggestionRef, isVisible, cursor, filteredList}) => {

  return (
    <div data-testid={'suggestions'}>
      {
        isVisible &&
        <div className={'suggested-list'}>
          <ul ref={suggestionRef}>
            {filteredList.map((tag, index) => {
              return <li key={index} className={`${cursor === index && 'active'} name`}>{tag}</li>
            })}
            {
              filteredList.length === 0 && <li>no result</li>
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Suggestions;
