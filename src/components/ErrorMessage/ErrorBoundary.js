import React, {Component} from 'react'

export default class ErrorBoundary extends Component {
    state = {
      error: null
    }
  
    static getDerivedStateFromError(error) {
        return { error };
    }
  
    componentDidCatch(error, info) {
        // console.log(error.toString(), info.componentStack)
    }

    render() {
        if (this.state.error) {
            return <p style={{textAlign: 'center', marginTop: '50px'}}>An error occured. Please try it again.</p>;
        }
        return this.props.children;
    }
};