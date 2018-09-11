import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMotivations, addMotivation } from "../../actions/motivations"
import { Title2 } from "../../lib/styledComponentsLib"
import { Redirect, Link } from 'react-router-dom'
import Header from "../Header/Header"
import MotivationForm from "./MotivationForm"

class AllMotivationsComponent extends Component {

	componentDidMount() {
		this.props.getMotivations()
	}

	addNewMotivation = (motivation) => {
		this.props.addMotivation(motivation)
	}

	render() {

		const { motivations, currentUser } = this.props

		if (currentUser) {
			return (
				<div>

					<Header />

					{!motivations && <p> "Loading ..." </p>}

					<MotivationForm onSubmit={this.addNewMotivation} />

					{
						motivations && motivations.map(mot =>
							< div key={mot.id} >
								<Title2> <Link to={`/all/${mot.id}`}> {mot.motivation} </Link> </Title2>
							</div>
						)
					}

				</div>
			)
		} else {
			return (
				<Redirect to="/" />
			)
		}
	}
}

const mapStateToProps = state => ({
	motivations: state.motivations,
	currentUser: state.currentUser !== null
})

export default connect(mapStateToProps, { getMotivations, addMotivation })(AllMotivationsComponent)