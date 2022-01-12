import React, { useState, useEffect } from 'react'
import "./BannerAvatar.scss";
import { API_HOST } from "../../../utils/constant";
import ConfigModal from '../../modal/ConfigModal';
import EditUserForm from '../EditUserForm/EditUserForm';
import AvatarNoFound from "../../../assets/png/avatar-no-found.png";
import {checkFollowApi, followUserApi, unfollowUserApi} from "../../../api/folllow";


export default function BannerAvatar(props) {
    const { user, loggedUser }=props;
    const [showModal, setshowModal] = useState(false);
    const [following, setFollowing] = useState(null);
    const bannerUrl = user?.banner
        ? `${API_HOST}/obtenerBanner?id=${user.id}`
        : null;
    const avatarUrl = user?.avatar
        ? `${API_HOST}/obtenerAvatar?id=${user.id}`
        : AvatarNoFound;

    const [reloadFollow, setReloadFollow] = useState(false);

    useEffect(() => {
        if(user){
            checkFollowApi(user?.id).then(response => {
                if(response?.status){
                    setFollowing(true);
                }else{
                    setFollowing(false);
                }
            });
        } 
        setReloadFollow(false);
    }, [user, reloadFollow]);

    const onFollow=()=>{
        followUserApi(user.id).then(()=>{
            setReloadFollow(true);
        });
    };
    
    const onUnFollow=()=>{
        unfollowUserApi(user.id).then(()=>{
            setReloadFollow(true);
        });
    };    
    return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
        <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
        {user && (
            <div className="options">
                {loggedUser._id===user.id && <button onClick={()=> setshowModal(true)}>Editar perfil</button>}
                {loggedUser._id!==user.id && (
                    following!==null && (
                        (following ? (
                            <button onClick={onUnFollow} className="unfollow">
                                <span>Siguiendo</span></button>) : 
                            (<button onClick={onFollow}>Seguir</button>))
                    
                    ))}
            </div>
        )}
        <ConfigModal show={showModal} setShow={setshowModal} title="Formulario de edición de perfil">
            <EditUserForm user={user} setShowModal={setshowModal}/>
        </ConfigModal>
        </div>
      
    )
}
