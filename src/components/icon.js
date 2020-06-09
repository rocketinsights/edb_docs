import React from 'react';
import ArrowLeftSvg from '../../static/edb-icons/arrow-left.svg'
import ChevronDownSvg from '../../static/edb-icons/chevron-down.svg'
import ChevronRightSvg from '../../static/edb-icons/chevron-right.svg'
import CloseSvg from '../../static/edb-icons/close.svg';
import DottedBoxSvg from '../../static/edb-icons/dotted-box.svg';
import HamburgerSvg from '../../static/edb-icons/hamburger.svg';
import SearchSvg from '../../static/edb-icons/search.svg';

export const iconNames = {
  ARROW_LEFT: 'arrowleft',
  CHEVRON_DOWN: 'chevrondown',
  CHEVRON_RIGHT: 'chevronright',
  CLOSE: 'close',
  DOTTED_BOX: 'dottedbox',
  HAMBURGER: 'hamburger',
  SEARCH: 'search',
};

function formatIconName(name) {
  return name && name.replace(/ /g, '').toLowerCase();
}

function IconType({ iconName, ...rest }) {
  switch (formatIconName(iconName)) {
    case iconNames.ARROW_LEFT:
      return <ArrowLeftSvg {...rest} />;
    case iconNames.CHEVRON_DOWN:
      return <ChevronDownSvg {...rest} />;
    case iconNames.CHEVRON_RIGHT:
      return <ChevronRightSvg {...rest} />;
    case iconNames.CLOSE:
      return <CloseSvg {...rest} />;
    case iconNames.DOTTED_BOX:
      return <DottedBoxSvg {...rest} />;
    case iconNames.HAMBURGER:
      return <HamburgerSvg {...rest} />;
    case iconNames.SEARCH:
      return <SearchSvg {...rest} />;    
    default:
      return null;
  }
}

function Icon({ circle, circleClassName, circleDiameter, ...rest }) {
  if (circle && circleDiameter) {
    return (
      <div
        className={`hpx-${circleDiameter} wpx-${circleDiameter} rounded-circle
        mx-auto d-flex justify-content-center align-items-center ${circleClassName}`}
      >
        {IconType(rest)}
      </div>
    );
  } else {
    return IconType(rest);
  }
}

Icon.defaultProps = {
  iconName: 'dottedbox',
  className: '',
  circleClassName: '',
  circleDiameter: 100,
  circle: false,
  width: 100,
  height: 100,
};

export default Icon;
