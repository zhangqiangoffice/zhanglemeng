import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Paper from '../components/Paper'
import PaperList from '../components/PaperList'

const PapersContainer = ({ paperList }) => (
  <PaperList>
    {paperList.map(paperData =>
      <Paper
        key={paperData.paper.id}
        paperData={paperData} />
    )}
  </PaperList>
)

const mapStateToProps = state => ({
  paperList: state.paperBase.qsh
})

export default connect(
  mapStateToProps
)(PapersContainer)
