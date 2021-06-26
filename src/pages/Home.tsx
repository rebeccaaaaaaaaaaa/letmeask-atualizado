import { useHistory } from "react-router-dom";
import IlustrationImg from "../assets/images/illustration.svg";
import Logo from "../assets/images/logo.svg";
import GoogleImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <>
      <div id="page-auth" className="">
        <aside>
          <img
            src={IlustrationImg}
            alt="ILustração simbolizando perguntas e respostas"
          />
          <strong> Crie salas de Q&amp;A ao vivo </strong>
          <p> Tire as dúvidas da sua audiencia em tempo real</p>
        </aside>

        <main>
          <div className="main-content">
            <img src={Logo} alt="Let me ask" />
            <button className="create-room" onClick={handleCreateRoom}>
              <img src={GoogleImg} alt="Logo do Google" />
              Crie sua sala com o Google
            </button>
            <div className="separator">ou entre em uma sala</div>
            <form action="" onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="DIgite o código da sala"
                onChange={(event) => setRoomCode(event.target.value)}
                value={roomCode}
              />
              <Button type="submit">Entrar na sala</Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
