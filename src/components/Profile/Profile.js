import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuth} from "../../Contexts/AuthContext"
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import General from './Settings/General';
import Appearance from './Settings/Appearance';
import AccountSettings from './Settings/AccountSettings';

export default class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            general:'flex items-center mt-5 p-2 cursor-pointer',
            logout:'flex items-center mt-5 p-2 cursor-pointer',
            accountsettings:'flex items-center mt-5 p-2 cursor-pointer',
            appearance:'flex items-center mt-5 p-2 cursor-pointer',
            active:'',
            chatcolor:""
        }
    }

   
    handleChange(param){
        for(var i in this.state){
            if(param === i){
                this.setState({[i]: 'flex items-center mt-5 p-2 cursor-pointer bg-slate-100',active: param})
            }
            else{
               this.setState({[i]: 'flex items-center mt-5 p-2 cursor-pointer',active: param})
            }
        }
    }

    changeChatColor(e){
        console.log(e)
        this.setState({chatcolor:"e"})
    }

    
    handleLogout(){
        this.props.handleLogout()
    }

    closeHandler(){
        this.props.closeProfile()
    }
    
    render(){
        console.log()
    return (
        <div className='absolute w-full h-full bg-white z-10 flex justify-center '>
            <div className='w-1/2 grid grid-cols-2'>
                {/* options */}
                <div className='grid'>

                    <div className='mt-10'>
                        <p>PREFERENCES</p>

                        {/* general */}
                        <div className={this.state.general} onClick={() =>{this.handleChange('general')}}>
                            <div className='w-fit rounded-full p-1 mr-2 bg-slate-700'>
                                <SettingsIcon sx={{width:"25px",height:"25px",fill:"white"}}/>
                            </div>
                            <p className='text-xl'>General</p>
                        </div>

                        {/* appearance */}
                        <div className={this.state.appearance} onClick={() =>{this.handleChange('appearance')}}>
                          <div className='bg-black w-fit rounded-full p-1 mr-2'>
                              <DarkModeIcon sx={{width:"25px",height:"25px",fill:"white"}}/>
                          </div>
                          <p className='text-xl'>Appearance</p>
                        </div>
                        
                    </div>

                    <div>
                        <p>ACCOUNT</p>

                        {/* logout */}
                        <div className={this.state.logout} onClick={() =>{this.handleLogout()}}>
                            <div className='w-fit rounded-full p-1 mr-2 bg-purple-500'>
                                <LogoutIcon sx={{width:"25px",height:"25px",fill:"white"}}/>
                            </div>
                            <p className='text-xl'>Logout</p>
                        </div>

                        {/* accountSettings */}
                        <div className={this.state.accountsettings} onClick={() =>{this.handleChange('accountsettings')}}>
                            <div className='w-fit rounded-full p-1 mr-2 bg-blue-400'>
                                <SettingsIcon sx={{width:"25px",height:"25px",fill:"white"}}/>
                            </div>
                            <p className='text-xl'>AccountSettings</p>
                        </div>
                    </div>

                </div>

                {/* show options */}

                <div className='mt-10 pl-5'> 

                    <div className='flex justify-end mb-3 '>
                        <CloseIcon sx={{cursor:"pointer"}} onClick={() => {this.closeHandler()}}/>
                    </div>
                    {this.state.active === "general" && (
                      <General/>
                    )}

                    {this.state.active === "appearance" && (
                        <Appearance/>
                    )}
                    
                 

                    {this.state.active === "accountsettings" && (
                       <AccountSettings/>
                    )}
                </div>

            </div>
        </div>

    )
    }

}


