import React, { useRef, useState } from 'react';

const Creategig = () => {
    const [title,setTitle]=useState(" ");
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState([]);
    const [success,setSucess]=useState("");
    const [error,setErro]=useState("");
    const coverRef = useRef(null);

    const resizeCover = (file) =>
        new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            1600,
            800,
            "jpeg",
            80,
            0,
            (uri) => {
              resolve(uri);
            },
            "file"
          );
        });
    
      const upload = async (e, t) => {
        const file = e.target.files[0];
        if (file) {
          if (
            file.type == "image/png" ||
            file.type == "image/jpeg" ||
            file.type == "image/jpg"
          ) {
            if (t == "avatar") {
              await resizeAvatar(file).then((data) => {
                console.log(data);
                setUserAvatarNew(data);
                let fileReader = new FileReader();
                fileReader.readAsDataURL(data);
                fileReader.onload = (event) => {
                  // @ts-ignore
                  setAvatarLocal(event.target.result);
                };
              });
            } else if (t == "cover") {
              await resizeCover(file).then((data) => {
                setUserCoverNew(data);
                let fileReader = new FileReader();
                fileReader.readAsDataURL(data);
                fileReader.onload = (event) => {
                  // @ts-ignore
                  setCoverLocal(event.target.result);
                };
              });
            }
          } else {
            Alert.fire({
              title: "Oops",
              text: "Only PNG and JPEG format is supported.",
              icon: "error",
              confirmButtonColor: "#6366f1",
              confirmButtonText: "Ok",
              timer: 1500,
            });
          }
        }
      };
    const handleSubmit=(e)=>{
       
    }

    return (
        <div>
           <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                 <input
                  type="file"
                  ref={coverRef}
                  onChange={(e) => upload(e, "cover")}
                  className="hidden"
                />
                <button type="submit">Submit</button>
            </form>
            
        </div>
    );
}

export default Creategig;
