import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {}

  handleReload() {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <React.Fragment>
          <h1>Something went wrong.</h1>
          <button onClick={handleReload}>Click Here to Reload</button>
        </React.Fragment>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
