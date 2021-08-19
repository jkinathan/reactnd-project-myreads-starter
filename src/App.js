import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Components/Books'
import SearchBook from './Components/SearchBook'
import { Route, Link } from 'react-router-dom'
class BooksApp extends React.Component {
  state = {

    books: [],
    query: [],
    
    
  }


  componentDidMount(){
    BooksAPI.getAll()
    .then((response)=>{
      this.setState(()=>({
        books: response
        
      }))
      console.log("Books",this.state.books)
    })
    
  }

  bookChange =(shelf,book)=> {

    // BooksAPI.update(book,shelf)
    // .then((response)=>{
    //   this.setState(()=>({
    //     books: Object.values(response)
    //   }))
    //   window.location.reload()
    // console.log("shelfs",this.state.books)
    // })

    BooksAPI.update(book, shelf)
    .then(booksresponse => {
      
      if(book.shelf === 'none' && shelf !== 'none'){
        this.setState(state => {
          const newBooks = state.books.concat(book);
          return {books: newBooks}
        })
      }

      const newUpdateBook = this.state.books.map(chgeShelfbook => {
        
        if (chgeShelfbook.id === book.id) {
          chgeShelfbook.shelf = shelf
        }
        return chgeShelfbook;
      });

      this.setState({
        books: newUpdateBook,
      });
      
        
        if(shelf === 'none'){
          this.setState(state=>{
            const newBooks = state.books.filter(remBook => remBook.id !== book.id);
            return {books: newBooks}
          })
        }
    });









  }

  updateQuery = (quer)=>{
    BooksAPI.search(quer)
    .then((response)=>{
      if (response != null) {
        this.setState(()=>({
          query: Object.values(response)
        }))
      }
      else{
        this.setState({
          query: []
        })
      }
      
      console.log("my Query",this.state.query)
    })
    
  }
  

  render() {

    const { query } = this.state

    return (
      <div className="app">
        
        <Route exact path="/search" render={()=>(
            <SearchBook books={this.state.books} thequery={query} updateQuery={this.updateQuery} changeBook={this.bookChange}/>

        )}/>

        <Route exact path="/" render={()=>(
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                  <div>
                      <Books books={this.state.books} changeBook={this.bookChange} />
                  </div>
                </div>

                <div className="open-search">
                
                  <Link to='/search'>Add a book</Link>
                
                </div>
              </div>
          )}/>
        
      </div>
    )
  }
}

export default BooksApp
