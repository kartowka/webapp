type student = {
  id: string
  name: string
}
const students: Array<student> = [
  { name: 'Eitan', id: '203192331' },
  { name: 'Eitan2', id: '203192332' },
  { name: 'Eitan3', id: '203192333' },
  { name: 'Eitan4', id: '203192334' },
]

const getStudents = () => {
  return students
}
const getStudent = (id: string) => {
  return students
}
const addStudent = (student: student) => {
  students.push(student)
}

export { getStudents, getStudent, addStudent, student }
