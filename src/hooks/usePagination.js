import {useState} from "react";

const usePagination = ({contentPerPage, count}) => {
  const [page, setPage] = useState(1);
  //общее количество страниц (общее кол-во данных / кол-во данных на странице
  const pageCount = Math.ceil(count / contentPerPage);
  //индекс последнего элемента текущей страницы
  const lastContentIndex = page * contentPerPage;
  //  //индекс первого элемента текущей страницы
  const firstContentIndex = lastContentIndex - contentPerPage;

  //изменение страницы вперед или назад
  const changePage = (direction) => {
    setPage((state) => {
      // вперед
      if (direction) {
        //если страница последняя,ничего не делать
        if (state === pageCount) {
          return state;
        }
        return state + 1;
        // назад
      } else {
        //если страница первая,ничего не делать
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSAFE = (num) => {
    //если число больше общего кол-ва страниц, то ставим последнюю стр
    if (num > pageCount) {
      setPage(pageCount);
      // if number is less than 1, set page to first page
      //если число меньше одно - первую стр
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};

export default usePagination;