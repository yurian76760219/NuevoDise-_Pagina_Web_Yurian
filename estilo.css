* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(to bottom, #ffd1dc, #ffe6f0);
  font-family: 'Segoe UI', sans-serif;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.contenedor-mensaje {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 5vw;
  color: #d63384;
  margin-bottom: 2rem;
  text-shadow: 2px 2px #fff;
}

.mensaje {
  font-size: 2.2vw;
  max-width: 90%;
  color: #5e2a4d;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  line-height: 1.8;
}

#mensaje-escrito::after {
  content: "|";
  animation: blink 1s infinite;
  color: #d63384;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 🌹 Rosas animadas en los costados */
.rosas {
  position: absolute;
  top: 0;
  width: 100px;
  height: 100%;
  background-image: url('https://i.ibb.co/xLfP03F/rose-floating.png');
  background-repeat: repeat-y;
  background-size: contain;
  animation: mover 20s linear infinite;
  opacity: 0.7;
  z-index: 1;
}

.rosas.izquierda {
  left: 0;
}

.rosas.derecha {
  right: 0;
  transform: scaleX(-1);
}

@keyframes mover {
  0% {
    background-position-y: 0;
  }
  100% {
    background-position-y: 1000px;
  }
}
