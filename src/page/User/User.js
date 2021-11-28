import React, {useState,useEffect} from 'react';
import "./User.scss";
import { withRouter } from "react-router-dom";
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import {toast} from "react-toastify";
import { getUserApi } from "../../api/user";
import BannerAvatar from '../../components/User/BannerAvatar';

function User(props) {
  const { setRefreshCheckLogin } = props;
  const { match }=props;
  const {params}=match;
  const [user, setUser] = useState(null);
    
  //console.log(user);

    useEffect(() => {
       getUserApi(params.id).then(response=>{
        if(!response) toast.error("El usuario no existe!");
         setUser(response)
       //console.log(response);
       
     }).catch(()=>{
          toast.error("El usuario no existe!")
     })
    }, [params])


    return (
        <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
        
        <div className="user__title">
          <h2>
            {user? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}
          </h2>
        </div>
        <BannerAvatar user={user} />
        <div>Información de usuario</div>
        <div className="user__tweets">Lista de tweets del usuario!</div>
        
      </BasicLayout>
    )
}

export default withRouter(User)
