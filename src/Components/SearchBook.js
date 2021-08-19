import React, { Component } from 'react'

export class SearchBook extends Component {

    constructor(props){
        super(props)

        this.state={
            myquery: ''
        }
    }

    render() {

        const { thequery, updateQuery, changeBook } = this.props

        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text"
                        value={this.myquery}
                        onChange={(event)=>updateQuery(event.target.value)}
                        placeholder="Search by title or author"/>

                    </div>
                    </div>
                    <div className="search-books-results">
                    <ol className="books-grid">
                        {
                        thequery.filter((missing)=> missing.imageLinks !== undefined).map((searchedBook)=>(
                            <li key={searchedBook.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${searchedBook.imageLinks.thumbnail}")` }}></div>
                                    <div className="book-shelf-changer">
                                    <select onChange={(e)=>changeBook(e.target.value,searchedBook)} defaultValue={(searchedBook.shelf) ? searchedBook.shelf : "none" }>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="book-title">{searchedBook.title}</div>
                                <div className="book-authors">{searchedBook.authors}</div>
                                </div>
                            </li>
                        ))
                        }
                    </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBook