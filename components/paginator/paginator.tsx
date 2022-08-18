import { useEffect, useState } from "react"

interface PaginatorProps {
    currentPage: number,
    maxItems: number,
    maxPage: number,
    path: string
}

const Paginator = ({ currentPage, maxItems, maxPage, path }: PaginatorProps) => {

    const [pages, setPages] = useState<number[]>([])
    const [lastPage, setLastPage] = useState<number>()
    const [nextPage, setNextPage] = useState<number>()

    useEffect(() => {

        let pageArray = []
        
        let endPage = (currentPage + 2)
        let startPage = (currentPage - 2)
    
        if(endPage < maxItems) {
          endPage = maxItems
        }
    
        if(currentPage + 2 > maxPage    ) {
          startPage = (maxPage - (maxItems-1))
        }
    
        for(let i = startPage; i <= endPage; i++) {
          pageArray.push(i)
        }
    
        pageArray = pageArray.filter(x => x >= 1 && x <= maxPage)
       
        setPages(pageArray)

        if(currentPage == 1) {
            setLastPage(1)
        } else {
            setLastPage(currentPage-1)
        }

        if(currentPage == maxPage) {
            setNextPage(maxPage)
        } else {
            setNextPage(currentPage+1)
        }

    }, [maxPage, currentPage])

    return (
        <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
            <li>
                <a href={`${path}?page=${lastPage}`} className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            {pages.map(x => {
                return <li key={x}>

                    {(x == currentPage) ? (
                        <a href={`${path}?page=${x}`} aria-current="page" className="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                            {x}
                        </a>
                    ) : (
                        <a href={`${path}?page=${x}`}className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            {x}
                        </a>
                    )}
                </li>
            })}
            <li>
                <a href={`${path}?page=${nextPage}`} className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav>
    )
}

export default Paginator