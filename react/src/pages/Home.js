import React, { useRef } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import YouTube from 'react-youtube';
import { useTranslation } from "react-i18next";

const Home = () => {
   const { t, i18n } = useTranslation();

   const videoId = 'jy1svuJ_DpM'; 
   const sliderImages = [   
      {
         url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Product_500718_55726.jpg",
      },
      {
         url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Danish_public_bicycle_CPH.jpg",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Biomega_ams_mens_8sp.jpg",
      },
      {
         url: "https://upload.wikimedia.org/wikipedia/commons/2/27/2010_Cervelo_RS_01.jpg",
      },
   ];

   // Ref to the YouTube player
   const playerRef = useRef(null);

   // Function to handle video end and replay
   const handleVideoEnd = event => {
      // Accessing the YouTube player and replaying the video
      const player = playerRef.current.internalPlayer;
      player.seekTo(0);
      player.playVideo();
   };

   return (
      /* L'expression minHeight: '100vh' est importante car
       elle garantit que la hauteur minimale de la div contenant
       le contenu est égale à 100% de la hauteur de la fenêtre visible
      */
      <div  style={{ backgroundColor: 'red', minHeight: '100vh' }}>             
         <div style={{ textAlign: 'center' }}>         
            <h3>{t("Welcome")}</h3><br/>
         </div>         

         {/* YouTube Video */}
         <div style={{ width: '50%', display: 'flex'}}>
            <div style={{ paddingLeft: '50px' }}>
                  <YouTube 
                     videoId={videoId} 
                     opts={{ 
                        playerVars: { 
                           autoplay: 1, 
                           mute: 1,
                           loop: 1 // Adding loop parameter to repeat the video
                        } 
                     }}
                     onEnd={handleVideoEnd} // Handling video end event
                     ref={playerRef} // Assigning the ref to the player
                  />
               </div>
             {/* Image Slider */}
               <div style={{ paddingLeft: '50px' }}>                   
                  <SimpleImageSlider
                     width={550}
                     height={360}
                     images={sliderImages}
                     showBullets={true}
                     showNavs={true}
                     autoPlay={true} 
                     autoPlayDelay={3}                     
                  />            
               </div>
         </div>     
      </div>
   );
}

export {Home};
