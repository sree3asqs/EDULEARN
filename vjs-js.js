var player= videojs('videoPlayer',{
    autoplay: 'muted',
    controls: true,
  
    poster: 'C:\Users\Admin\Desktop\Edulearn\Title-Image-4_80465274aebb5.webp',
    playbackRates: [0.25, 0.5, 1, 1.5, 2, 2.5],
    plugins:{
        hotkeys:{
            enableModifiersForNumber: false,
            seekStep: 30,
        },
    },
});