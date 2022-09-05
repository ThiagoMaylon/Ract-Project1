import P from 'prop-types';
import { Component } from 'react';
import './styles.css';

export class Button extends Component {
  render() {
    const { text, onClick, disabled = false } = this.props;
    return (
      <button disabled={disabled} onClick={onClick}>
        {text}
      </button>
    );
  }
}
Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
