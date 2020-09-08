const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
	const response = await request(app).post('/users').send({
		name: 'Ankit Patra',
		email: 'ankit@gmail.com',
		password: '@PJ1996julu'
	}).expect(201)
	
	// Assert that the database was changed correctly
	const user = await User.findById(response.body.user._id)
	expect(user).not.toBeNull()
	
	// Assertions about the response
	expect(response.body).toMatchObject({
		user: {
			name: 'Ankit Patra',
			email: 'ankit@gmail.com'
		},
		token: user.tokens[0].token
	})
	
	expect(user.password).not.toBe('@PJ1996julu')
})

test('Should Login Existing User', async() => {
	const response = await request(app).post('/users/login').send({
		email: userOne.email,
		password: userOne.password
	}).expect(200)
	
	const user = await User.findById(userOneId)
	expect(user.tokens[1].token).toEqual(response.body.token)
})

test('Should not login non-existing users', async() => {
	await request(app).post('/users/login').send({
		email: 'aparna1@gmail.com',
		password: '@PJ1996julu'
	}).expect(400)
})

test('Should fetch User Profile', async() => {
	await request(app)
		.get('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200)
})

test('Should not get Profile when not authenticated', async() => {
	await request(app).get('/users/me')
		.send()
		.expect(401)
})

test('Should delete an authenticated user', async() => {
	const response = await request(app).delete('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200)
	
	const user = await User.findById(userOneId)
	expect(user).toBeNull()
})

test('Should not let an un-authenticated user to delete', async() => {
	await request(app).delete('/users/me')
		.send()
		.expect(401)
})

test('Sould upload avatar image', async() => {
	const response = await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('avatars', 'tests/fixtures/ankpatra.jpeg')
		.expect(200)
	
	const user = await User.findById(userOneId)
	expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async() => {
	const response = await request(app).patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: 'Ankit',
			email: 'ankitpatra@gmail.com',
			password: 'mushriri'
		})
		.expect(200)
	
	const user = await User.findById(userOneId)
	expect(user.name).toEqual('Ankit')
	expect(user.email).toEqual('ankitpatra@gmail.com')
	expect(user.password).not.toEqual('mushriri')
})

test('Should not update invalid user fields', async() => {
	const response = await request(app).patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			_id: '18375dubjd',
			name: 'Ankit'
		})
		.expect(400)
})