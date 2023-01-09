import bcrypt from 'bcryptjs'

const users = [
  {
    firstName: 'Admin',
    lastName:'User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    phone:'9087654321',
    isAdmin: true,
  },
  {
    firstName: 'John',
        lastName: 'Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    phone:'9987654321'
  },
  {
    firstName: 'Jane',
        lastName: 'Doe',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    phone:'99875643218'
  },
  {
    firstName: 'Dummy',
        lastName: 'User',
    email: 'dummy@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    phone:'7887654321'
  },
]

export default users
