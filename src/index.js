import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Oops. Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

class App extends React.Component {
  render() {

    return (
      <React.StrictMode>
        <ErrorBoundary>
          <Game />
        </ErrorBoundary>
      </React.StrictMode>
    );
  } 
}

ReactDOM.render(<App />, document.getElementById("root"));

