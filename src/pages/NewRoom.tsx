import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import IlustrationImg from "../assets/images/illustration.svg";
import Logo from "../assets/images/logo.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
            <h2> Criar uma nova sala</h2>
            <form onSubmit={handleCreateRoom}>
              <input
                type="text"
                value={newRoom}
                placeholder="Nome da sala"
                onChange={(event) => setNewRoom(event.target.value)}
              />
              <Button type="submit"> Criar sala</Button>
            </form>
            <p>
              {" "}
              Quer entrar em uma sala exitente? <Link to="/">
                {" "}
                clique aqui
              </Link>{" "}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
