import React, { useState } from 'react';
import './ImageUpload.css';
import {useStateValue} from './StateProvider';
import { db,storage } from './firebase';
import firebase from "firebase";
import { Button } from '@material-ui/core';


export default function ImageUpload() {
    const [{user},dispatch]=useStateValue();
    const [caption , setCaption] = useState("");
    const [image , setImage] = useState(null);
    const [progress,setProgress]=useState(0);


    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        if (name==="caption"){
            return (setCaption(value))
        }else if (name==="image" && e.target.files.length>0){
            return (setImage(e.target.files[0]));
        }else if (e.target.files.length===0){
            alert("Upload a file ... We got it empty!")
        }else{
            alert("Unable to upload server down!")
        }
    }
    const handleUpload = (e)=>{
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress update....
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);    
            },
            (error)=>{
                //error function....
                console.log(error);
                alert(error.message);
            },
            ()=>{
                //complte function....
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    //Post the image inside the database;
                    db.collection('posts').add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        image:url,
                        username:user.displayName

                    });
                    setProgress(0);
                    setCaption("")
                    setImage(null)
                })
            }

        )
    }

    return (
        <div className="imageupload__wrapper">
            <div className="imageupload">
            
                <progress className="imageupload__progress" value={progress} max="100" />
                <input  className="imageupload__caption" name="caption" type="text" placeholder="Enter Caption..." value={caption} onChange={handleChange} />
                <input className="imageupload__selecto" name="image" type="file" onChange={handleChange} />
                <Button
                    className="imageupload__button"
                    type="submit"
                    onClick={handleUpload}
                >
                    Upload
                </Button>
                
             </div>
        </div>
        
    )
}
