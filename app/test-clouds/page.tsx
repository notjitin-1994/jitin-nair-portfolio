export default function TestClouds() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: 'black' }}>
      <video
        autoPlay loop muted playsInline
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
        src="https://cdn.pixabay.com/video/2023/10/20/185791-876251213_large.mp4"
      />
      <h1 style={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: '10rem', fontWeight: 'bold', color: 'white', mixBlendMode: 'overlay', zIndex: 10
      }}>
        BEHIND CLOUDS
      </h1>
    </div>
  )
}
