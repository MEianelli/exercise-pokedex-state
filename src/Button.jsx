import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <div>{ this.props.children }</div>
    );
  }
}

export default Button;