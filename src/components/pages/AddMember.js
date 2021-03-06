import React, {useState} from 'react';
import db,{auth} from '../../firebase';
import {useHistory} from 'react-router-dom';

const AddMember = (props) => {

    const history = useHistory();

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [contact,setContact] = useState('');
    const [role,setRole] = useState('');
    const [assigned,setAssigned] = useState('');
    const [error,setError] = useState('');

    const onUsernameChange = (event) => setUsername(event.target.value);
    const onEmailChange = (event) => setEmail(event.target.value);
    const onPasswordChange = (event) => setPassword(event.target.value);
    const onContactChange = (event) =>{ setContact(event.target.value);
        setRole('member');
        setAssigned('no');
    }
    
    const onAddMember = () => {
       
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
         setuserdata();
         
        })
        .catch(function(error) {
          var errorMessage = error.message;
          setError(errorMessage);
        });

    }

    const onSignout = () =>{
      auth.signOut().then(function() {
          history.push("/");
        }).catch(function(error) {
          var errorCode = error.code;
      var errorMessage = error.message;
        });
  }

    const setuserdata = () =>{

    
        
        let postRef = db.collection('user_mst')
        let payload = {username,email,contact,role,assigned}
        postRef.add(payload)
        .then(function(file){
            onSignout();
            history.push("/");
        })

    }

  return (
    <div>
        {error}
        <h3>Add Member</h3>
        <h5>Name</h5>
        <input type="text" value={username} onChange={onUsernameChange} />
        <h5>Email</h5>
        <input type="email" value={email} onChange={onEmailChange} />
        <h5>contact Number</h5>
        <input type="text" value={contact} onChange={onContactChange} />
        <h5>password</h5>
        <input type="password" value={password} onChange={onPasswordChange} />
        
        <button onClick={onAddMember}>Add member</button>
    </div>
  );
}

export default AddMember;