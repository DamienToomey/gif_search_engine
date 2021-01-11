import React from 'react';
import './App.css';

import { GiphyFetch } from '@giphy/js-fetch-api'

import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from "react-router-dom";

class Gif extends React.Component {
  constructor(props) {
    super(props);
    this.useDefaultSrc = this.useDefaultSrc.bind(this);
  }

  /**
   * Set src path to local gif that says "THIS CONTENT IS NOT AVAILABLE"
   * when initial src path generates an error (file not found or not an mp4 file)
   * @arg {Event} event onError event
   */
  useDefaultSrc(event) {
    event.target.src = process.env.PUBLIC_URL+"/giphy-downsized-small.mp4";
    this.props.onGifDisplayError();
  }

  render() {
    const { gif } = this.props;
    return (
      <span>
        <Link to={{ 
          pathname: "/newpage",
          state: {
            gif
          }
        }}>
          {/* {gif["images"]["downsized_small"]["mp4"]} */}
          <video src="bullshit.mp4"
                onError={this.useDefaultSrc}
              type="video/mp4"
              width="150px"
              height="150px"
              autoPlay
              muted
              loop>
              Your browser does not support the video tag.
          </video>
        </Link>
      </span>
    );
  }
}

class Alert extends React.Component {
  render() {
    const { message } = this.props;
    return (
        <Toast
          animation={false} // Otherwise I get "Warning: findDOMNode is deprecated in StrictMode."
          onClose={this.props.onToastClose}
          show={this.props.show}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="warning">WARNING</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
  }
}

class Gifs extends React.Component {
  constructor(props) {
    super(props);
    this.handleGifDisplayError = this.handleGifDisplayError.bind(this);
  }

  handleGifDisplayError() {
    this.props.onGifDisplayError();
  }

  render() {
    const rows = [];
    
    this.props.gifs.forEach((gif) => {
      rows.push(
          <Gif
            gif={gif}
            key={gif["id"]}
            onGifDisplayError={this.handleGifDisplayError}
          />
      );
    });

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSearchClick(e) {
    this.props.onSearchClick();
  }
  
  handleInputTextChange(e) {
    this.props.onInputTextChange(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleSearchClick()
  }

  render() {
    return (
      <Form 
        onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Row>
            <Col>
              <Form.Control type="text" placeholder="Enter GIF keywords"
              value={this.props.inputText} onChange={this.handleInputTextChange} />
            </Col>
            <Col sm={13}> {/* 13 is greater than 12 (max value) so it forces Col to minimum size to fit Button*/}
              <Button variant="primary" onClick={this.handleSearchClick}>Search</Button>
            </Col>
          </Form.Row>
      </Form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      gifs: [],
      isSearchClicked: false,
      cannotLoadAtLeastOneImage: false,
    };
    
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.handleGifDisplayError = this.handleGifDisplayError.bind(this);
    this.handleToastClose = this.handleToastClose.bind(this);

    // Why this (react docs)
    // Define as constant
    this.gf = new GiphyFetch('sV8eZprYQZP28xz7LxaXbrv95g22CT7Z');
  }

  async searchGif() {
    try {
      const { data: gifs } = await this.gf.search(this.state.inputText, { sort: 'relevant', lang: 'en', limit: 10, type: 'stickers', offset: 0, rating: 'g' });
      this.setState({ gifs });
    } catch (error) {
      this.setState({ gifs: [] });
    }
  }

  handleSearchClick() {
    this.setState({ isSearchClicked: true });
    this.searchGif();
  }

  handleInputTextChange(inputText) {
    this.setState({ inputText });
  }

  handleGifDisplayError() {
    this.setState({ cannotLoadAtLeastOneImage: true })
  }

  handleToastClose() {
    this.setState({ cannotLoadAtLeastOneImage: false })
  }

  render() {
    return (
      <div>
        <img src={process.env.PUBLIC_URL+"/PoweredBy_200_Horizontal_Light-Backgrounds_With_Logo.gif"} alt="Powered by GIPHY" />
        <Alert
          message="One or several GIFs could not be displayed (image not found or not an mp4 file)"
          show={this.state.cannotLoadAtLeastOneImage}
          onToastClose={this.handleToastClose}
        />
        <div className="search-and-display"> 
          <SearchBar
            inputText={this.state.inputText}
            onInputTextChange={this.handleInputTextChange}
            onSearchClick={this.handleSearchClick}
          />
          {!this.state.isSearchClicked ? <span></span> : this.state.gifs.length === 0 ? <Spinner animation="border" variant="primary"/> : <Gifs
            gifs={this.state.gifs}
            inputText={this.state.inputText}
            onGifDisplayError={this.handleGifDisplayError}
          />}
        </div>
      </div>
      
    );
  }
}

export default App;
