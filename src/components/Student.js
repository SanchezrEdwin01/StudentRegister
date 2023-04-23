import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Student() {
    const paperStyle={padding: '50px 20px', width:600, margin: "20px auto"}
    const[name, setName]=React.useState('')
    const[address, setAddress]=React.useState('')
    const[students, setStudents]=React.useState([])
    const handelClick=(e)=>{
        e.preventDefault()
        const student={name, address}
        console.log(student)
	fetch("http://localhost:8080/student/add",{
		method: "POST",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(student)
	}).then(()=>{
	  console.log("New student is added")
	})
    }

React.useEffect(()=>{
  fetch("http://localhost:8080/student/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setStudents(result);
  })
  },[])
  return(
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"Black"}}>Add a new student</h1>
        <TextField
          id="outlined-basic"
          label="Name"
          fullWidth
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={{ margin: "10px 0" }}
        />
        <br/>
        <TextField
          id="outlined-basic"
          label="Address"
          fullWidth
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          style={{ margin: "10px 0" }}
        />
        <br/>
        <Button variant="outlined" onClick={handelClick}>Submit</Button>
        </Paper>

        <h1>
          Students
        </h1>
        
        <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper elevation={6} style={{margin:"10px", padding: "15px", textAlign:"left"}} key={student.id}>
            Id: {student.id}<br/>
            Name: {student.name}<br/>
            Address: {student.address}
        </Paper>
        ))}
        </Paper>
    </Container>
  );
}
