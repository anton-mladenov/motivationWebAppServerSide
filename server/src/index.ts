import 'reflect-metadata'
import { createKoaServer, Action, BadRequestError } from 'routing-controllers'
import LoginController from "./logins/controller"
import UserController from "./users/controller"
import MotivationController from "./motivations/controller"
import setupDb from './db'
import { verify } from './jwt';
import User from "./users/entity"

const port = 4000;
let time = `${new Date().getHours()}:${new Date().getMinutes()}`;

const app = createKoaServer({
	cors: true,
	controllers: [
		LoginController,
		UserController,
		MotivationController
	],
	authorizationChecker: (action: Action) => {
		const header: string = action.request.headers.authorization
		if (header && header.startsWith('Bearer ')) {
			const [, token] = header.split(' ')

			try {
				return !!(token && verify(token))
			}
			catch (e) {
				throw new BadRequestError(e)
			}
		}

		return false
	},
	currentUserChecker: async (action: Action) => {
		const header: string = action.request.headers.authorization
		if (header && header.startsWith('Bearer ')) {
			const [, token] = header.split(' ')

			if (token) {
				const { id } = verify(token)
				return User.findOne(id)
			}
		}
		return undefined
	}
})


setupDb()
	.then(_ => {
		app.listen(port);
		console.log(`Listening on port ${port} @ ${time}`);
	})
	.catch(err => console.error(err))
