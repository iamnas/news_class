import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country:"in",
    pageSize: 8,
    category:"general"

  }

  static propTypes = {
    // name:PropTypes.bool.isRequired,
    country:PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
  }

  capatalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  

  constructor (props) {
      super(props);
      this.state = {
          articles : [],
          loading : false,
          page:1
      }

      document.title = `${this.capatalizeFirstLetter(this.props.category)} - Mine News`;
  }

  async updateNews() {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d11e174e88154920ae94359e22d4a467&page=${this.state.page}&&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ 
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })

  }

  async componentDidMount(){
    // console.log("cdm");

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d11e174e88154920ae94359e22d4a467&page=${this.state.page}&&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({ 
    //   articles:parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading:false
    // })

    this.updateNews()

  }

  handlePrevClick = async () => {

    console.log("Previous");
    this.setState({page:this.state.page - 1})
    this.updateNews()
  }

  handleNextClick = async () => {
    
    console.log("Next");
    this.setState({page:this.state.page + 1})
    this.updateNews()

     
  }

  render() {
    console.log("render");
    return (
      <div className="container my-3">
       <h1 className="text-center " style={{margin:'35px 0px;'}} >MyNews - Top {this.capatalizeFirstLetter(this.props.category)} Headlines </h1>
       {/* if loading is true then we have to show loading component */}
       {this.state.loading && <Spinner/>}
        <div className="row" >
          {/* if loading is not true then we have to show contant  */}
          {!this.state.loading && this.state.articles.map((element) => {
            return(
              <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl = {element.urlToImage}  newsUrl= {element.url} author={element.author} source={element.source.name} date={(new Date(element.publishedAt)).toGMTString()} />
              </div>)             
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled = { this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
        {/* <div className="container">
        <button type="button" class="btn btn-dark">Previous</button>
        <button type="button" class="btn btn-dark">Next</button>
        </div> */}
      </div>
    )
  }
}

export default News