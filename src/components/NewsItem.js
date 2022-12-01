import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'flex-end', position:'absolute',right: '0'}}>  
            <span className=" badge rounded-pill bg-danger" >{source}</span>
          </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://ipfs.io/ipfs/bafybeid3zjjmhfrz6zw4j2b3rtrhbtzsbnh3amntoisue3tilawfdfrreu/c9.png"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {" "}
              {title}{" "}
             
            <span className="badge bg-secondary">New</span>
            </h5>
            <p className="card-text"> {description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on {date}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
