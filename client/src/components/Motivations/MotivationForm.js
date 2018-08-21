import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Title2 } from "../../lib/styledComponentsLib"
// import { addMotivation } from "../../actions/motivations"

class MotivationForm extends Component {

	state = {}

	myRef = React.createRef()

	componentDidMount() {
		this.myRef.current.focus()
	}

	handleChange = (event) => {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.myRef.current.focus()
		event.target.reset()

		this.props.onSubmit(this.state)
	}

	render() {

		const initialValues = this.props.initialValues || {}

		return (
			<div>

				<form onSubmit={this.handleSubmit}>
					<label>
						Add A New Motivation
					<input type="text" name="motivation" ref={this.myRef} value={
							this.state.motivation !== undefined ? this.state.motivation : initialValues.motivation
						} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>

			</div>
		)
	}
}

// export default connect(null, { addMotivation })(AddNewMotivation)
export default connect(null, {})(MotivationForm)