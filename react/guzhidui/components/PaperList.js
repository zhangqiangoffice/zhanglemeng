import React, { PropTypes } from 'react'

const PaperList = ({children}) => (
  <ul className="paper_list">
    {children}
  </ul>
)

PaperList.propTypes = {
  children: PropTypes.node
}

export default PaperList