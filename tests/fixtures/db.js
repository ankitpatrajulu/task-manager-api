const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
	_id: userOneId,
	name: 'Aparna',
	email: 'aparna@gmail.com',
	password: '@PJ1996julu',
	tokens: [{
		_id: new mongoose.Types.ObjectId(),
		token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET_KEY)
	}]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
	_id: userTwoId,
	name: 'Ankit',
	email: 'ankit1996@gmail.com',
	password: '@PJ1996julu',
	tokens: [{
		_id: new mongoose.Types.ObjectId(),
		token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET_KEY)
	}]
}

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: '1st Task',
	completed: false,
	owner: userOneId
}
 
const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: '2nd Task',
	completed: true,
	owner: userTwoId
}

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: '3rd Task',
	completed: false,
	owner: userOneId
}

const taskFour = {
	_id: new mongoose.Types.ObjectId(),
	description: '4th Task',
	completed: true,
	owner: userTwoId
}

const setupDatabase = async() => {
	await User.deleteMany()
	await Task.deleteMany()
	await new User(userOne).save()
	await new User(userTwo).save()
	await new Task(taskOne).save()
	await new Task(taskTwo).save()
	await new Task(taskThree).save()
	await new Task(taskFour).save()
}

module.exports = {
	userOneId,
	userOne,
	userTwo,
	taskOne,
	taskTwo,
	taskThree,
	taskFour,
	setupDatabase
}