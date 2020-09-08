const app = require('../src/app')
const request = require('supertest')
const Task = require('../src/models/task')
const { userOne, userOneId, userTwo, userTwoId, taskOne, taskTwo, taskThree, taskFour, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Tasks could be created', async() => {
	const response = await request(app).post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
		description: 'Adding test suite'
	}).expect(201)
	
	const task = await Task.findById(response.body._id)
	expect(task).not.toBeNull()
	expect(task.completed).toEqual(false)
	expect(task.owner).toEqual(userOneId)
})

test('Get all Tasks of an user', async() => {
	const response = await request(app)
		.get('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200)
	
	expect(response.body.length).toEqual(2)
})

test('Should fail Delete Task by an unauthorized user', async() => {
	const response = await request(app).delete(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send().expect(401)
})