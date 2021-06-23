import {useHistory} from 'react-router-dom'
import IlustrationImg from "../assets/images/illustration.svg";
import Logo from "../assets/images/logo.svg";
import GoogleImg from "../assets/images/google-icon.svg";
import '../styles/auth.scss'
import { Button } from "../components/Button";
import { useAuth } from '../hooks/useAuth';



export function Home() {

  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();

  async function handleCreateRoom(){

    if(!user){
       await signInWithGoogle();
    }

    history.push('/rooms/new');
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
            <form action="">
              <input type="text" placeholder="DIgite o código da sala" />
              <Button type="submit">Entrar na sala</Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
