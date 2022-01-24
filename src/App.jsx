import React, {useEffect, useState} from 'react';
import usePagination from "./hooks/usePagination";
import axios from "axios";

const App = () => {
  const [people, setPeople] = useState([]);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 50,
    count: people.length,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          "https://jsonplaceholder.typicode.com/comments"
        );
        setPeople(data.data);
      } catch(e){
        console.log(e)
      }
    })();
  }, []);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [page]);


  return (
    <div className="App">
      <h1 className="title">usePagination</h1>
        <>
          <div className="items">
            {people
              .slice(firstContentIndex, lastContentIndex)
              .map((el) => (
                <div className="item" key={el.id}>
                  <div className="item__info">
                    <p className="name">
                      {el.email}
                      <span className="username">(@{el.name})</span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="pagination">
            <p className="text">
              {page}/{totalPages}
            </p>
            <button
              onClick={prevPage}
              className={`page ${page === 1 && "disabled"}`}
            >
              &larr;
            </button>
            {
              [...Array(totalPages).keys()].map((el) => (
                <button
                  onClick={() => setPage(el + 1)}
                  key={el}
                  className={`page ${page === el + 1 ? "active" : ""}`}
                >
                  {el + 1}
                </button>
              ))
            }
            <button
              onClick={nextPage}
              className={`page ${page === totalPages && "disabled"}`}
            >
              &rarr;
            </button>
          </div>

        </>
    </div>
  );
};

export default App;