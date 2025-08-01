import React, { useState } from 'react'
import { useLazyGetRepositoriesQuery } from '../services/api'

const Header = ({ quantityOfPage, query, setQuery, fetchData, endCursor}:{ quantityOfPage:number, query:string, setQuery: Function, fetchData:Function, endCursor:string}) => {

  return (
    <header className="header">
        <div className="header__container">
            <div className="header__serach">
                <input type="text" placeholder='Введите поисковый запрос' value={query} onChange={e =>setQuery(e.target.value) } className='header__input'/>
                <button 
                    className="header__btn" 
                    onClick={
                        ()=>fetchData({searchQuery: query, endCursor: endCursor, repNumber: quantityOfPage})
                    }
                >
                    Найти
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header