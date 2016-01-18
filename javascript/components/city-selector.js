import React from 'react';

class CitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'CitySelector';
  }
  render() {
    return <div className="city-selector">
      <div className="city-selector__current">
        { this.props.current }
      </div>
    </div>;
  }
}

export default CitySelector;
