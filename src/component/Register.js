import './Register.css';
import {useState} from 'react';
import {Button, Form, FormGroup, Input, Label, FormFeedback, FormText} from 'reactstrap';

const Register = ({setRegistered}) => {

  //params
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csp, setCsp] = useState("Not selected");
  const [level, setLevel] = useState("");
  const [certname, setCertname] = useState("");
  const [certid, setCertid] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [expiry, setExpiry] = useState(new Date());
  const [validity, setValidity] = useState("");
  
  
  //request 
  const sendData = async () => {
    const data = {
        name: name,
        email: email,
        password: password,
        csp: csp,
        level: level,
        certname: certname,
        certid: certid,
        startDate: startDate,
        expiry: expiry,
        validity: validity
    }
    const request = {
        method : 'POST', 
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    console.log(request);
    const response = await fetch(`http://localhost:8000/registration`,request);
    const result = await response.json();
    console.log(result.registered);
    setRegistered(result.registered);
}
  
  //validition
  const submit = () => {
    let valid = 1;
    if(startDate>new Date()){
      valid = 0;
      alert("certification date must be in past");
    }
    if(expiry <= new Date()){
      valid = 0;
      alert("expiry date must be in future");
    }
    const domain = email.split("@");
    if(domain[1] !== 'virtusa.com'){
      valid = 0;
     alert("email id must be from virtusa domain");
    }
    if(valid){
      sendData();
    }
  }

  return (
    <div className="Register">
      <h1 className="text-center">
        <span className="font-weight-bold">vitusa</span>
      </h1>
      <Form>
        <FormGroup>
          <Label>Employee Name</Label>
          <Input value={name} onChange={(e) => {
                    setName(e.target.value);
                }}/>
          <FormFeedback></FormFeedback>
          <FormText> Enter the Name with intial</FormText>
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" placeholder="id@example.com" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
          <FormFeedback></FormFeedback>
          <FormText> must be in virtusa domain </FormText>
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
          <FormFeedback></FormFeedback>
          <FormText> use atleast one special character </FormText>
        </FormGroup>
        <FormGroup>
          <Label>CSP</Label>
          
        <Input type="select" onChange={(e) => {
                    setCsp(e.target.value);
                }}>
          <option value="--not selected--">--not selected--</option>
          <option value="GCP">GCP</option>
          <option value="AWS">AWS</option>
          <option value="Azure">Azure</option>
        </Input>
          
        </FormGroup>
        <FormGroup>
          <Label>Certification Level</Label>
          <Input value={level} onChange={(e) => {
                    setLevel(e.target.value);
                }}/>
          <FormText>Enter the Level</FormText>
        </FormGroup>
        <FormGroup>
          <Label>Certification Name</Label>
           
          <Input value={certname} onChange={(e) => {
                    setCertname(e.target.value);
                }}/>
          <FormText>Enter the Certification Name</FormText>
           
         
        </FormGroup>
        <FormGroup>
          <Label>Certification ID</Label>
          <Input value={certid} onChange={(e) => {
                    setCertid(e.target.value);
                }}/>
          <FormText>Enter the Certification Id</FormText>
        </FormGroup>
        <FormGroup>
         
          <Label>Date of Certification</Label>
           
          
          <Input
          type="date"
          placeholder="date placeholder"
          onChange={(e) => {
            setStartDate(e.target.value);
        }}
        />
          <FormText>must be below past date</FormText>
         
        </FormGroup>
        <FormGroup>
         
          <Label>Expiry Date of Certification</Label>
           
          <Input
          type="date"
          placeholder="date placeholder"
          onChange={(e) => {
            setExpiry(e.target.value);
        }}
        />
          <FormText>must be future date</FormText>
         
        </FormGroup>
        <FormGroup>
         
          <Label> Validity </Label>
           
          <Input value={validity} onChange={(e) => {
                    setValidity(e.target.value);
                }}/>
           
         
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block" onClick={submit}>Submit</Button>
        
      </Form>
    </div>
  );

}

export default Register;