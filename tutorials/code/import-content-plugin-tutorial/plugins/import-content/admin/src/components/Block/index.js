/**
 *
 * Block
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Wrapper, Sub } from './components';

const renderMsg = msg => <p>{msg}</p>;

const Block = ({ children, description, style, title }) => (
  <div className="col-md-12">
    <Wrapper style={style}>
      <Sub>
        {!!title && (
          <p>
            {title}
          </p>
        )}
        {!!description && (
          <p>
            {description}
          </p>
        )}
      </Sub>
      {children}
    </Wrapper>
  </div>
);

Block.defaultProps = {
  children: null,
  description: null,
  style: {},
  title: null,
};

Block.propTypes = {
  children: PropTypes.any,
  description: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
};

export default memo(Block);
