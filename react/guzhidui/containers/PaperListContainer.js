import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from '../components/Paper'
import PaperList from '../components/PaperList'

const PaperListContainer = ({ paperList }) => (
  <PaperList>
    {paperList.map(paper =>
      <Paper
        key={paper._id}
        paper={paper} />
    )}
  </PaperList>
)

const mapStateToProps = state => ({
  paperList: state.paperList
})

export default connect(
  mapStateToProps
)(PaperListContainer)
