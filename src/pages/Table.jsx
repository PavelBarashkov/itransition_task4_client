import React, {useContext, useEffect, useState} from "react";
import { ButtonToolbar, Container, Table, ButtonGroup, Button, FormCheck } from "react-bootstrap";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/Service";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import jwtDecode from "jwt-decode";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";

export const UserTable = observer(() => {

  const { user } = useContext(Context);
  const [users, setUsers] = useState([]);
  const[checkAll, setCheckAll] = useState(false);
  const authUserId = jwtDecode(localStorage.getItem('token'));
  const [fetchData, error] = useFetching( async() => {
    const response = await PostService.getAll();
    const usersWithSelection = response.data.map((user) => ({ ...user, selected: false }));
    setUsers(usersWithSelection);
  })

  const getUserData = async (id) => {
    try {
      const response = await PostService.getUserId(id);
      
      if (response === 'blocked') {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
      }
    
    } catch (error) {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
    }
  }
  getUserData(authUserId.id)

  useEffect(()=> {
    fetchData()
  
  },[user.isAuth])
  const handleCheckChange = (id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        
        return { ...user, selected: user.selected !== undefined ? !user.selected : false };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
  };
  const handleSelectAllChange = () => {
    if (checkAll) {
      setCheckAll(false)
    } else {
      setCheckAll(true)
    }
    const updatedUsers = users.map((user) => {
      if(user.id === authUserId.id){
        user.selected = 'true'
      }
      return { ...user, selected: !user.selected  };
    });
    setUsers(updatedUsers);
  };
  
  const blockUsers = async() => {
    const selectedUsers = users.filter((user) => user.selected);
    const blockedUserIds = [];
    for (const person of selectedUsers) {
      try {
        await PostService.dataUpdateId(person.id, 'blocked');
        


        if(person.id === authUserId.id) {
          localStorage.removeItem('token');
          user.setUser({});
          user.setIsAuth(false);
        }
        setCheckAll(false)
        blockedUserIds.push(person.id);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };
  const unBlockUsers = async() => {
    const selectedUsers = users.filter((user) => user.selected);
    const blockedUserIds = [];
    for (const person of selectedUsers) {
      try {
        await PostService.dataUpdateId(person.id, 'active');
        
        setCheckAll(false)
        blockedUserIds.push(person.id);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };

  const deleteUser = async (id) => {
    await PostService.deleteUserId(id);
    fetchData();
  };
  const removeUser = async () => {
    const selectedUsers = users.filter((user) => user.selected);
    const deletedUserIds = [];
    for (const person of selectedUsers) {
      try {
        await deleteUser(person.id);
        setCheckAll(false)
        deletedUserIds.push(person.id);
        if(person.id === authUserId.id) {
            localStorage.removeItem('token');
            user.setUser({});
            user.setIsAuth(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    const updatedUsers = users.filter((user) => !deletedUserIds.includes(user.id));
    setUsers(updatedUsers);
  }

    return (
        <Container>
          
            <ButtonToolbar>
              <ButtonGroup className="me-2 " aria-label="Second group">
                  <Button variant="outline-secondary ml-5" onClick={blockUsers}><IoLockClosedOutline/></Button> 
                  <Button variant="outline-secondary" onClick={unBlockUsers}><IoLockOpenOutline/></Button>
                  <Button variant="outline-secondary" onClick={removeUser}><IoTrashOutline/></Button>
              </ButtonGroup>
            </ButtonToolbar>
            
            <Table striped bordered hover>
            <thead>
              <tr>
              <th><FormCheck type="checkbox" checked={checkAll} onClick={handleSelectAllChange} /></th>  
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Registration date</th>
                <th>Last login date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                {users.map(user =>
                  <tr key={user.id}>
                    <td><FormCheck 
                      checked={user.selected || false}
                      onChange={() => handleCheckChange(user.id)}/>
                    </td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.registrationDate}</td>
                    <td>{user.lastLoginDate}</td>
                    <td>{user.status}</td>
                  </tr> 
                )}
          </tbody>
    </Table>
        </Container>
    )
})